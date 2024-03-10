import { useEffect, useState } from 'react';
import {Modal,Input} from 'antd';

import { useSaveIssueMutation, useUpdateIssueMutation } from '../../slices/apislice';

import styles from './AddEditModal.module.css';

const { TextArea } = Input;

const AddEditModal = (props) => {
    const {isVisible, changeIsVisible,editData,changeEditData} = props

    const [titleText, setTitleText] = useState(editData?.title ?? '')
    const [descriptionText, setDescriptionText] = useState(editData?.description ?? '')

    const [createIssue,{isLoading:saveIsLoading}] = useSaveIssueMutation()
    const [updateIssue,{isLoading:updateIsLoading}] = useUpdateIssueMutation()
    console.log(saveIsLoading)
    //on Cancel Button Click Event
    const onCancel = () => {
        changeIsVisible(false) 
        changeEditData(null)
        setTitleText('')
        setDescriptionText('')
    }

    const onSubmit = async () => {
        if (editData === null) {
            await createIssue({title: titleText, description: descriptionText})
        }else{
            await updateIssue({id: editData?._id,title: titleText, description: descriptionText})
        }
        changeEditData(null)
        setTitleText('')
        setDescriptionText('')
        changeIsVisible(false) 
    }

    useEffect(() => {
        setTitleText(editData?.title ?? '')
        setDescriptionText(editData?.description ?? '')
    },[editData])

    return (
        <Modal open={isVisible} okText={"Submit"} onCancel={onCancel} onOk={onSubmit} destroyOnClose={true} confirmLoading={saveIsLoading || updateIsLoading}>
            <div className={styles.modalWrapper}>
                <div className={styles.title}>{editData === null ? 'Add Issue' : 'Edit Issue'}</div>
                <Input placeholder="Title" className={styles.inputTitle} value={titleText} onChange={(e) => setTitleText(e.target.value)}/>
                <TextArea rows={4} placeholder="Description" value={descriptionText} onChange={(e) => setDescriptionText(e.target.value)}/>
            </div>
        </Modal>
    )
}

export default AddEditModal;