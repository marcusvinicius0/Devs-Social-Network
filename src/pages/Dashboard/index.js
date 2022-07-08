import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import PublicModal from '../../components/PublicationModal';

import { AiFillPicture, AiFillLike } from 'react-icons/ai';
import { FiVideo } from 'react-icons/fi';
import { FaUsers, FaUserCircle, FaCommentDots } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import avatar from '../../assets/avatar.png';

import { AuthContext } from '../../contexts/auth';

export default function Dashboard() {
    const [showPostModal, setShowPostModal] = useState(false);

    const { signOut, user } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    const [content, setContent] = useState([]);

    function togglePostModal() {
        setShowPostModal(!showPostModal)
    }

    // useEffect(() => {

    //     function Response(){

    //     }

    //     Response()
    //     setContent(Response)

    // }, [])

    return (
        <>
            <Header />

            <div className={styles.sideBox}>
                {avatarUrl === null ?
                    <img src={avatar} alt="foto avatar" />
                    :
                    <img src={avatarUrl} alt="foto usuario" />
                }
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.role}>{user.role}</p>
                <hr />

                <div className={styles.routesBox}>

                    <Link to="/profile">
                        <span>
                            <FaUserCircle color="var(--soft-blue)" size={24} />
                            <p>Meu perfil</p>
                        </span>
                    </Link>

                    <span>
                        <FaUsers color="var(--soft-blue)" size={24} />
                        <p>Seguidores</p>
                    </span>

                    <span>
                        <FaEnvelopeOpenText color="var(--soft-blue)" size={22} />
                        <p>Meus projetos</p>
                    </span>

                    <span className={styles.logoutBox} onClick={signOut}>
                        <IoLogOut color="var(--soft-blue)" size={25} />
                        <p>Sair</p>
                    </span>
                </div>
            </div>

            <div className={styles.publicationContainer}>
                <div className={styles.contentBox}>
                    {avatarUrl === null ? <img src={avatar} alt="user-profile" /> : <img src={avatarUrl} alt="user-profile" />}
                    <button
                        onClick={() => togglePostModal()}
                        type="text"
                    >
                        No que você está pensando?
                    </button>
                </div>
                <span>
                    <AiFillPicture size={25} color="var(--soft-blue)" onClick={() => togglePostModal()} />
                    <FiVideo size={25} color="var(--soft-blue)" onClick={() => togglePostModal()} />
                </span>

                <div className={styles.feed}>

                    {user.publication === '' ? <div></div> :
                        <div className={styles.publicationBox}>
                            <img src={avatarUrl === null ? avatar : avatarUrl} />
                            <div className={styles.userInfo}>
                                <p className={styles.userName}>{user.name}</p>
                                <p className={styles.role}>Desenvolvedor Front-end • React.js</p>
                            </div>

                            <p className={styles.publi}>{user.publication}</p>
                            <hr />
                            <div className={styles.reactions}>
                                <AiFillLike size={25} color="var(--soft-gray)" /><p>Gostei</p>

                                <FaCommentDots size={22} color="var(--soft-gray)" />
                                <p>Comentar</p>
                            </div>

                            <BsThreeDots className={styles.configIcon} size={25} color="var(--soft-gray)" />
                        </div>}

                </div>

            </div>



            {showPostModal && (
                <PublicModal
                    close={togglePostModal}
                />
            )}
        </>

    )
}