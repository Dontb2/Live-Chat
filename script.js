        // Modified WebSocket connection for public access
        const WS_ENDPOINT = "wss://loveadmin.netlify.app"; // Replace with your public WebSocket server
        let myWebSocket;
        let reconnectAttempts = 0;

        function connectWebSocket() {
            myWebSocket = new WebSocket(WS_ENDPOINT);

            myWebSocket.addEventListener("open", () => {
                console.log("Connected to the server");
                reconnectAttempts = 0;
            });

            myWebSocket.addEventListener("message", (serverMsg) => {
                chatBox.innerHTML += '<div class="admin">' + serverMsg.data + '</div>';
                chatBox.scrollTop = chatBox.scrollHeight;
            });

            myWebSocket.addEventListener("close", () => {
                console.log("Connection closed");
                handleReconnect();
            });

            myWebSocket.addEventListener("error", (error) => {
                console.error("WebSocket error:", error);
            });
        }

        function handleReconnect() {
            const maxReconnectAttempts = 5;
            const baseDelay = 1000;
            
            if (reconnectAttempts < maxReconnectAttempts) {
                const delay = baseDelay * Math.pow(2, reconnectAttempts);
                reconnectAttempts++;
                
                setTimeout(() => {
                    console.log(`Reconnecting attempt ${reconnectAttempts}`);
                    connectWebSocket();
                }, delay);
            }
        }

        // Rest of original script remains with added touch event support...
        // Add touch event listeners for mobile devices
        btnSend.addEventListener("touchstart", (e) => {
            e.preventDefault();
            sendMessage();
        });

        // Rest of original script...