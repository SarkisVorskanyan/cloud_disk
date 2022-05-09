import React, { FC, useEffect, useState } from 'react'
import defaultAvatar from '../assets/common/avatar.jpg'
import MainButton from '../components/UI/buttons/MainButton'
import UploadBtn from '../components/UI/buttons/UploadBtn'
import { API_URL, AVATAR_URL } from '../config/Config'
import { createAvatar, deleteAvatar } from '../store/actions/Auth_action'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'
import '../styles/pageStyles/profilePageStyles/ProfilePageStyles.scss'

const ProfilePage: FC = () => {

    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const [avatar, setAvatar] = useState<string | undefined>(undefined)
    const [image, setImage] = useState<any>() //TODO
    const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false)
    const ProfileImg = `${AVATAR_URL}${user?.user.avatar}`

    useEffect(() => {
        console.log(ProfileImg);
        console.log(user?.user.avatar);
        console.log(user);
        
    }, [user])

    const uploadAvatar = (e: any) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setAvatar(fileReader.result as string)
            setImage(e.target.files[0])
        };
        fileReader.readAsDataURL(e.target.files[0])
        setShowSaveBtn(true)
    }

    const saveAvatar = () => {
        const formData = new FormData()
        formData.append('file', image)
        dispatch(createAvatar(formData))
        //setShowSaveBtn(false)
    }

    const removeAvatar = () => {
        dispatch(deleteAvatar())
    }

    return (
        <div className='profile_container'>
            <div className='avatar_container'>
                <img src={user?.user.avatar ? ProfileImg : avatar !== undefined ? avatar : defaultAvatar} alt='avatar' />
                {/* <img src={ProfileImg} alt='avatar' /> */}
            </div>
            <div className='profile_btn_container'>
                <UploadBtn
                    label={'Загрузить аватарку'}
                    letMultiple={false}
                    someFunction={uploadAvatar}
                    acceptImg={'image/*'}
                    background='#F07427' />
                {showSaveBtn && <div className='saveBtn'>
                    <MainButton
                        label='Сохранить'
                        background='#36E733'
                        someFunction={saveAvatar} />
                </div>}
                {user?.user.avatar && <div className='saveBtn'>
                    <MainButton
                        label='Удалить'
                        background='#E72831'
                        someFunction={removeAvatar} />
                </div>}

            </div>
        </div>
    )
}

export default ProfilePage