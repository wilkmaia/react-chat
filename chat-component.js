// ChatApp React Class
var ChatApp = React.createClass({
    // Starts the connection to the server when users enters page
    getInitialState: function(){
        return {
            messages: [],
            socket: window.io('http://localhost:3000')
        }
    },

    // Communication setup
    componentDidMount: function(){
        var self = this;

        // Client waits for new messages and pushes them onto array
        this.state.socket.on('receive-message', function(msg){
            self.state.messages.push(msg);
            self.setState({
                messages: self.state.messages
            });
        });
    },

    // Send message to server
    submitMessage: function(){
        var message = document.getElementById('message').value;
        document.getElementById('message').value = '';

        if (message) {
            this.state.socket.emit('new-message', message);
        }
    },

    // Renders content
    render: function(){
        var self = this;

        var i = -1;
        var messages = self.state.messages.map(function(msg){
            ++i;
            return (<li className="chat-message-item" key={i}>{msg}</li>);
        });

        return(
            <div>
                <ul>
                    {messages}
                </ul>
                <input type="text" id="message" />
                <button onClick={() => self.submitMessage()}>Send</button>
            </div>
        );
    }
});

// Calls the DOM renderer
ReactDOM.render(
    <ChatApp />,
    document.getElementById('chat')
);