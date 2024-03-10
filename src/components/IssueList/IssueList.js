import { Table, Dropdown, Button } from "antd";

import {
  useGetAllIssuesQuery,
  useDeleteIssueMutation,
} from "../../slices/apislice";
import { useEffect } from "react";

const IssueList = (props) => {
  const { setEditData, changeIsVisible, editData, isVisible } = props;

  const { data: issueData, isLoading, refetch } = useGetAllIssuesQuery();
  const [deleteIssue] = useDeleteIssueMutation();

  const onActionClick = (data) => {
    setEditData(data);
  };

  const onEditClick = (data) => {
    setEditData(null);
    changeIsVisible(true);
  };

  const onDeleteClick = async () => {
    setEditData(null);
    await deleteIssue({ id: editData?._id });
    refetch();
  };

  useEffect(() => {
    if (!isVisible) {
      refetch();
    }
  }, [isVisible, refetch]);

  const items = [
    {
      key: "1",
      label: <div onClick={() => onEditClick()}>Edit</div>,
    },
    {
      key: "2",
      label: <div onClick={() => onDeleteClick()}>Delete</div>,
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (row, data) => {
        return (
          <Dropdown
            menu={{ items }}
            placement="bottom"
            onOpenChange={() => onActionClick(data)}
            arrow
          >
            <Button
              onClick={() => onActionClick(data)}
              onTouchStart={() => onActionClick(data)}
            >
              Actions
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading......</div>;
  } else {
    return <Table columns={columns} dataSource={issueData} />;
  }
};

export default IssueList;
