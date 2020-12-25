import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadImage } from 'actions/file';
import { updateProfilePhoto } from 'actions/profile';
import { ELocalStorageItem } from 'consts';
import { IAppState, IAsyncData, ILocalUser, ISimpleId } from 'models';
import { IPhotoRp } from 'services/profile/models';
import { isPending } from 'utils/redux';

import FileInput from 'components/FileInput';

import profileImagePlaceholder from 'assets/images/profile-photo-placeholder.svg';
import addPhotoIcon from 'assets/images/icons/ic-add-photo.svg';

interface IProps {
    onPhotoChange?: () => void;
}

const Profile: React.FC<IProps> = ({ onPhotoChange }) => {
    const dispatch = useDispatch();
    const photoBranch = useSelector<IAppState, IAsyncData<ISimpleId>>((state) => state.uploadImage);
    const localUser = JSON.parse(localStorage.getItem(ELocalStorageItem.USER_DETAILS) || '{}') as ILocalUser;

    const {
        photo,
        position,
        name,
        surname,
        photoChangedName,
    } = localUser;

    const [profilePhoto, setProfilePhoto] = React.useState(photoChangedName || profileImagePlaceholder);

    const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = Array.from(e.target.files ?? [])[0];
        const formData = new FormData();
        formData.append('File', file);
        dispatch(uploadImage(formData)).then((data: ISimpleId) => {
            const { id } = data;
            dispatch(updateProfilePhoto(id as string)).then(({ url }: IPhotoRp) => {
                    localStorage.setItem(ELocalStorageItem.USER_DETAILS, JSON.stringify({
                        ...localUser,
                        photoChangedName: url
                    }));
                    setProfilePhoto(url);
                }
            );
        });
    };

    return (
        <div className="profile d-none d-xl-flex align-items-center cpy-12 cpx-24">
            <div className="profile__photo">
                <img src={profilePhoto} alt="profile" />
                <div className="profile__photo__input">
                    <FileInput
                        disabled={isPending(photoBranch)}
                        label={(
                            <div className="profile__photo__input-label">
                                <img src={addPhotoIcon} alt="" />
                            </div>
                        )}
                        id="profilePhoto"
                        onChange={handleProfilePhotoChange}
                    />
                </div>
            </div>
            <div>
                <h1>{name} {surname}</h1>
                <span
                    className="profile__position fs-1"
                    title={position}
                >
                    {position}
                </span>
            </div>
        </div>
    )
};

Profile.displayName = 'Profile';

export default Profile;
