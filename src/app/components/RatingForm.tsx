import React from "react"
import { Button, Modal, Form, Input, Radio, Select } from "antd"

const { TextArea } = Input
const { Option } = Select

interface RatingFormProps {
  visible: boolean
  onCancel: () => void
  onCreate: () => void
  form: { getFieldDecorator: Function }
}

const __RatingForm = ({
  visible,
  onCancel,
  onCreate,
  form,
}: RatingFormProps) => {
  const { getFieldDecorator } = form

  return (
    <Modal
      visible={visible}
      title="Ajouter un commentaire"
      okText="Ajouter"
      cancelText="Annuler"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="✍️ Mon commentaire pour ce film">
          {getFieldDecorator("comments", {
            rules: [
              {
                required: true,
                message: "Merci d'ajouter un commentaire!",
              },
            ],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item label="🤔 Ma note pour ce film">
          {getFieldDecorator("rate", {
            rules: [
              { required: true, message: "Merci de noter entre 1 et 10!" },
            ],
          })(
            <Select placeholder="Choississez votre note 🤗">
              {Array.from(Array(11).keys()).map(rate => (
                <Option key={rate} value={rate}>
                  {rate}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export const RatingForm = Form.create({
  name: "form_in_modal",
})(__RatingForm)
