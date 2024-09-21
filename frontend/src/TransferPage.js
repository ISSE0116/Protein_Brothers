import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './TransferPage.css';
import { UserContext } from './UserContext'; 

const TransferPage = () => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useContext(UserContext); // コンテキストからユーザー情報を取得


  useEffect(() => {
    console.log("User Context Data:", user);
    const loggedInUserId = user.id
    fetch('http://localhost:5000/api/recipients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: loggedInUserId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipients(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [user.id]);

  const handleRecipientClick = (id) => {
    navigate(`/send/${id}`); // クリックされたユーザーのIDを送金ページに渡す
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="transfer-page">
      <h2>送金先一覧</h2>
      <div className="recipients-list">
        {recipients.map((recipient) => (
          <div
            key={recipient.id}
            className="recipient-card"
            onClick={() => handleRecipientClick(recipient.id)} // クリックで送金ページに移動
          >
            {recipient.icon ? (
              <img
                src={`data:image/png;base64,${recipient.icon}`}
                alt={`${recipient.username}のアイコン`}
                className="recipient-icon"
              />
            ) : (
              <div className="recipient-icon-placeholder">No Icon</div>
            )}
            <p className="recipient-name">{recipient.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferPage;
