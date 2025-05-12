import { AllOrders } from "../../../redux/slices/allOrderSlice";

import { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SidebarLayout from "../sidebarLayout";

export default function ProjectList() {
  const dispatch = useDispatch();
const { items, loading } = useSelector((state) => state.projects || { items: [], loading: false });

  useEffect(() => {
    dispatch(AllOrders());
  }, );

  if (loading) return <Spinner animation="border" />;

  return (
   <SidebarLayout>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th><th>Title</th><th>Client</th><th>Expert</th><th>Status</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items?.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.title}</td>
            <td>{p.client?.name}</td>
            <td>{p.expert?.name ?? "Unassigned"}</td>
            <td>{p.status}</td>
            <td>
              {/* <Button onClick={() => dispatch(updateProjectStatus({ id: p.id, status: 'approved' }))}>
                Approve
              </Button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </SidebarLayout>
  );
}
