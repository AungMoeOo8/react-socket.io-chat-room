import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useRef,
} from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import { socketContext } from "./socketProvider";
import { peopleReducer } from "./reducers/peopleReducer";
import { messageReducer } from "./reducers/messageReducer";
import MessageComponent from "./components/messageComponent";

function Chat() {
  const { socket, closeConnection } = useContext(socketContext);
  const [messages, setMessages] = useReducer(messageReducer, []);
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef();
  const [people, setPeople] = useReducer(peopleReducer, [
    { socketId: socket.id, name: socket.io.opts.query.user },
  ]);

  const btnDisabled = useMemo(() => {
    if (messageInput.length === 0) {
      return true;
    }
    return false;
  }, [messageInput]);

  useEffect(() => {
    socket.on("clientConnect", ({ socketId, username, currentTime }) => {
      setPeople({ type: "add", payload: { socketId, name: username } });
      setMessages({
        type: "clientConnect",
        payload: { socketId, author: username, time: currentTime },
      });
    });

    socket.on(
      "clientDisconnect",
      ({ socketId, username, currentTime, reason }) => {
        setPeople({ type: "remove", payload: { socketId } });
        setMessages({
          type: "clientDisconnect",
          payload: { socketId, author: username, time: currentTime },
        });
      }
    );
    socket.on("message", ({ socketId, username, message, currentTime }) => {
      setMessages({
        type: "message",
        payload: { socketId, author: username, time: currentTime, message },
      });
    });
  }, [socket]);

  const sendMessage = async (message) => {
    await socket.emit("message", message);
    setMessageInput("");
    inputRef.current.focus();
  };

  return (
    <Container
      style={{
        position: "relative",
        height: "100vh",
        maxWidth: "600px",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "calc(50vh - 208.35px)",
        }}
      >
        <div
          style={{
            backgroundColor: "lavender",
            borderRadius: "0.5rem",
            padding: "10px",
            boxShadow: "5px 5px 20px gray",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3
              style={{
                color: "slateblue",
                fontSize: "1.6rem",
                fontWeight: "bold",
              }}
            >
              {socket.io.opts.query.user}
            </h3>
            <Button onClick={closeConnection}>Disconnect</Button>
          </div>
          <Row style={{ flexDirection: "column" }}>
            <Col style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              {people.map((element) => (
                <div
                  style={{ borderRadius: "5px", boxShadow: "1px 1px 5px gray" }}
                >
                  <p
                    id="badge"
                    style={{
                      fontWeight: "500",
                      padding: "1px 8px",
                      position: "relative",
                    }}
                  >
                    {element.name}
                  </p>
                </div>
              ))}
            </Col>
            <Col>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  padding: "10px",
                  height: "300px",
                  overflowY: "auto",
                }}
              >
                {messages.map((message, index) => {
                  switch (message.socketId === socket.id) {
                    // Others Messages
                    case false:
                      return (
                        <div key={index} style={{ marginBottom: "20px" }}>
                          <MessageComponent message={message} />
                        </div>
                      );

                    // My messages
                    case true:
                      return (
                        <div
                          key={index}
                          style={{
                            marginBottom: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                        >
                          <MessageComponent message={message} />
                        </div>
                      );
                  }
                })}
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Form.Control
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  placeholder="Write something here..."
                  ref={inputRef}
                />
                <Button
                  disabled={btnDisabled}
                  onClick={() => sendMessage(messageInput)}
                >
                  Send
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default React.memo(Chat);
