import { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AllBdOrders, AllClientOrders, AllExpertOrders } from "../../../redux/slices/allOrderSlice";
import SidebarLayout from "../sidebarLayout";

export default function ProjectList() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("UserData") || '{}'); // adjust this based on your auth slice

  const {
    orderDetail,
    expertOrders,
    clientOrders,
    bdOrders,
    isLoading,
  } = useSelector((state) => state.order);

  // Load orders on mount depending on role
  useEffect(() => {
    if (user?.role === 'expert/freelancer') {
      dispatch(AllExpertOrders());
    } else if (user?.role === 'client') {
      dispatch(AllClientOrders());
    } else if (user?.role === 'bd') {
      dispatch(AllBdOrders());
    } 
  }, [dispatch, user?.role]);

  // Select orders list depending on role
  let filteredOrders = [];
  if (user?.role === 'expert/freelancer') {
    filteredOrders = expertOrders;
  } else if (user?.role === 'client') {
    filteredOrders = clientOrders;
  } else if (user?.role === 'bd') {
    filteredOrders = bdOrders;
  } 

  if (isLoading) return <Spinner animation="border" />;

  return (
    <SidebarLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Client</th><th>Expert</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.client?.name}</td>
              <td>{p.expert?.name ?? "Unassigned"}</td>
              <td>{p.status}</td>
              <td>
                {/* Add action buttons here if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SidebarLayout>
  );
}
