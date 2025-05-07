import { useEffect } from "react";
import { Alert, Button, Card, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../../redux/slices/blogSlice";
import SidebarLayout from "../sidebarLayout";

const BlogListPage = () => {
  const dispatch = useDispatch();
  const { list: blogs, isLoading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <SidebarLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📝 Blog Management</h5>
          <Link to="/admin/blogs/create" className="btn btn-primary">
            + New Blog
          </Link>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.title}</td>
                    <td>{blog.author || "Admin"}</td>
                    <td>{blog.status}</td>
                    <td>{blog.created_at?.split("T")[0]}</td>
                    <td>
                      <Link to={`/admin/blogs/edit/${blog.id}`} className="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </Link>
                      <Button size="sm" variant="outline-danger">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </SidebarLayout>
  );
};

export default BlogListPage;
