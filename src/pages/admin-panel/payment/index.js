import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AllOrders, ApproveOrderPayment, RejectOrderPayment } from "../../../redux/slices/allOrderSlice";
import SidebarLayout from "../sidebarLayout";

import { HOST_API } from '../../../config';


export default function PaymentVerification() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [receiptBlobUrl, setReceiptBlobUrl] = useState(null);

  const { orderDetail = [], isLoading = false } = useSelector(
    (state) => state.allOrder || {}
  );
const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  useEffect(() => {
    dispatch(AllOrders());
  }, [dispatch]);

  const filteredOrders = orderDetail.filter((order) => {
    const matchesSearch = `${order.id} ${order.client?.name} ${order.expert?.name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      order.payment_method === "bank_transfer" &&
      order.status === "pending_verification"
    );
  });

const handleViewReceipt = async (order) => {
  setSelectedOrder(order);
  setShowModal(true);
  setReceiptBlobUrl(null); // reset

  const fileName = order.transfer_receipt_path.split("/").pop();
  let accessToken = localStorage.getItem("accessToken");
     
  try {
    const response = await fetch(
      `${HOST_API}files/bank_receipts/${fileName}`,
      {
        method: "GET",
        credentials: "include", 
                 headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to load receipt.");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setReceiptBlobUrl(url);
  } catch (error) {
    console.error("Error loading receipt:", error);
    setReceiptBlobUrl(null);
  }
};

const handleCloseModal = () => {
  setShowModal(false);
  if (receiptBlobUrl) {
    URL.revokeObjectURL(receiptBlobUrl); // free memory
    setReceiptBlobUrl(null);
  }
};

  const handleApprove = async (orderId) => {
  try {
    await dispatch(ApproveOrderPayment(orderId));
    setToast({ show: true, message: "✅ Payment approved successfully.", type: "success" });
    setShowModal(false);
  } catch (error) {
    setToast({ show: true, message: error || "Failed to approve payment.", type: "error" });
  }
};

const handleReject = async (orderId) => {
  try {
    await dispatch(RejectOrderPayment(orderId)).unwrap();
    setToast({ show: true, message: "❌ Payment rejected successfully.", type: "success" });
    setShowModal(false);
  } catch (error) {
    setToast({ show: true, message: error || "Failed to reject payment.", type: "error" });
  }
};


  return (
    <SidebarLayout>
      <h4 className="mt-3">Bank Transfer Payment Verifications</h4>

      <Row className="my-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by ID, client, expert..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button
            variant="outline-secondary"
            onClick={() => setSearchTerm("")}
          >
            Reset
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <Alert variant="info">No bank transfer payments pending verification.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client</th>
              <th>Expert</th>
              <th>Price</th>
              <th>Status</th>
              <th>Receipt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client?.fname || "N/A"}</td>
                <td>{order.seller?.fname || "Unassigned"}</td>
                <td>${order.price}</td>
                <td>
                  <Badge bg="warning">Pending Verification</Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleViewReceipt(order)}
                  >
                    View Receipt
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleApprove(order.id)}
                    className="me-1"
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleReject(order.id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
     <Modal show={showModal} onHide={handleCloseModal} centered size="lg">

        <Modal.Header closeButton>
          <Modal.Title>Payment Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
         {receiptBlobUrl ? (
    <Image src={receiptBlobUrl} alt="Transfer Receipt" fluid />
  ) : (
    <p>Loading or failed to load receipt.</p>
  )}
        </Modal.Body>
        <Modal.Footer>
         <Button variant="secondary" onClick={handleCloseModal}>
  Close
</Button>

        </Modal.Footer>
      </Modal>
    </SidebarLayout>
  );
}
