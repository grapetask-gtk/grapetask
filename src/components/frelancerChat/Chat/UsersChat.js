import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import search from "../../../assets/searchbar.webp";
import { fetchConversations, setSelectedConversation } from "../../../redux/slices/messageSlice";
import ReadChat from "./ReadChat";
import UnRead from "./UnRead";

const UsersChat = () => {
  const dispatch = useDispatch();
  const { conversations, selectedConversation, loading } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);


  
  useEffect(() => {
  console.log("conversations:", conversations);
}, [conversations]);


  const handleSelectConversation = (conversation) => {
    console.log('sending or slecting conv from sidebar', conversation);
    dispatch(setSelectedConversation(conversation));
  };

  return (
    <div className="bh-white p-3 rounded-3" style={{ boxShadow: "0px -2px 10px 0px #00000014" }}>
    
      <div className="container-fluid">
        <div className="row allgigs-field">
          <div className="col-12 px-0">
            <div className="input-group p-2 h-100 poppins">
              <span className="input-group-text pt-0 pb-0" id="basic-addon1">
                <img src={search} width={16} alt="search" />
              </span>
              <input
                type="text"
                className="form-control p-0 font-12"
                id="floatingInputGroup1"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-3">Loading...</div>
      ) : conversations?.length === 0 ? (
        <div className="text-center py-3">No conversations yet.</div>
      ) : (
        conversations?.map((conv) => {
    
          const Component = conv.unreadCount > 0 ? UnRead : ReadChat;
          return (
            <Component
              key={conv.id}
              conversation={conv}
              isSelected={selectedConversation?.id === conv.id}
              onClick={() => handleSelectConversation(conv)}
            />
          );
        })
      )}
    </div>
  );
};

export default UsersChat;
