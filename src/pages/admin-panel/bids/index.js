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
  Toast,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { HOST_API } from "../../../config";
import { getBids } from "../../../redux/slices/bidsSlice";
import SidebarLayout from "../sidebarLayout";

export default function PaymentVerification() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const { bids = [], isLoading = false } = useSelector(
    (state) => state.bids || {}
  );

  useEffect(() => {
    dispatch(getBids());
  }, [dispatch]);


  
  // useEffect(() => {
  //  console.log('order', order ); 
  
  // });


  const filteredOrders = bids.filter((order) => {
    const matchesSearch = `${order.id} ${order.user_id} ${order.paid_amount}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      order.payment_method === "bank_transfer" &&
      order.status === "pending_verification"
    );
  });

  const handleViewReceipt = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleApprove = async (orderId) => {
    try {
      // await dispatch(approveOrderPayment(orderId)).unwrap();
      setToast({ show: true, message: "✅ Payment approved successfully.", type: "success" });
      setShowModal(false);
      dispatch(getBids());
    } catch (error) {
      setToast({ show: true, message: error.message || "Failed to approve payment.", type: "danger" });
    }
  };

  const handleReject = async (orderId) => {
    try {
      // await dispatch(rejectOrderPayment(orderId)).unwrap();
      setToast({ show: true, message: "❌ Payment rejected successfully.", type: "success" });
      setShowModal(false);
      dispatch(getBids());
    } catch (error) {
      setToast({ show: true, message: error.message || "Failed to reject payment.", type: "danger" });
    }
  };

  return (
    <SidebarLayout>
      <h4 className="mt-3">Bank Transfer Payment Verifications</h4>

      <Row className="my-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by ID, user ID, amount..."
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
              <th>User ID</th>
              <th>Paid Amount</th>
              <th>Status</th>
              <th>Receipt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>${order.paid_amount}</td>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedOrder?.receipt_path ? (
            <Image
              src={`${HOST_API}${selectedOrder.receipt_path}`}
              alt="Transfer Receipt"
              fluid
            />
          ) : (
            <p>No receipt uploaded.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={toast.show}
        bg={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </SidebarLayout>
  );
}
