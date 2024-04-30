import React, { useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Spin,
  Form,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import dayjs from "dayjs";

export default ({
  loader,
  role,
  isEditMode,
  visible,
  item,
  onCancel,
  handleAddOrEdit,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (isEditMode) {
      form.setFieldsValue({
        name: item?.name || "",
        currentBid: item?.currentBid || null,
        startDate: dayjs(item?.startDate, "YYYY-MM-DD HH:mm") || "",
        endDate: dayjs(item?.endDate, "YYYY-MM-DD HH:mm") || "",
        description: item?.description || "",
        // imageUrl: item?.imageUrl || "",
      });
    }
  }, [item, visible, form, isEditMode]);
  function onModalCancel() {
    onCancel();
    form.resetFields();
  }

  const onFinish = (values) => {
    handleAddOrEdit(values, item?.id);
  };

  const handleUploadImage = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const validFormats = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 5 * 1024 * 1024;

      if (!validFormats.includes(file.type)) {
        message.error("Please upload JPG or PNG image.");
        return;
      }

      if (file.size > maxSizeInBytes) {
        message.error("Please upload an image with a size no more than 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (visible) {
            const fileNameElement = document.getElementById("file-name");
            if (fileNameElement) {
              fileNameElement.textContent = file.name;
            }
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error updating image:", error);
      message.error("An error occurred while uploading the image.");
    }
  };

  return (
    <div>
      <Modal title="Item" open={visible} footer={null} onCancel={onModalCancel}>
        <Spin tip="Loading..." spinning={loader}>
          <Form form={form} name="item" variant="filled" onFinish={onFinish}>
            {role === "admin" && (
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input Name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            )}
            <Form.Item
              name="currentBid"
              rules={[
                { required: true, message: "Please input Current Bid!" },
                { pattern: /^[0-9]*$/, message: "Please input numbers only!" },
              ]}
            >
              <InputNumber placeholder="currentBid" addonBefore="$" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please input Description!" }]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <div style={{ display: "Flex", justifyContent: "space-between" }}>
              <Form.Item
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Please input Start date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Start Date"
                  showTime={{
                    format: "HH:mm",
                  }}
                  // minDate={new Date()}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Please input End date!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="End Date"
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  // minDate={new Date()}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Upload"
              name="imageUrl"
              rules={[
                { required: true, message: "Please input item's Image!" },
              ]}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </Form.Item>
            <div id="file-name"></div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};
