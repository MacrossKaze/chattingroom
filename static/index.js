// create localstorage to record counter
if (!localStorage.getItem('message_counter'))
	localStorage.setItem('message_counter', 0);


document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // when connected..
    socket.on('connect', () => {
		// set button disabled by default
		document.querySelector('#submit').disabled = true;		
		
		// enable button only if there exist text
		document.querySelector('#chat').onkeyup = () => {
			if (document.querySelector('#chat').value.length > 0)
				document.querySelector('#submit').disabled = false;
			else
				document.querySelector('#submit').disabled = true;
		}
				
        // press "enter!" to emit a "submit message" event
        document.querySelector('#form').onsubmit = () => {
			const message_content = document.querySelector('#chat').value;
			// counter
			let message_counter = localStorage.getItem('message_counter');
			message_counter++;
			const message = `${message_counter}==> ${message_content}`;         
			// emit to server
            socket.emit('submit', {'selection': message});
			
			// update counter
			localStorage.setItem('message_counter', message_counter);
			
			// clear input field
			document.querySelector('#chat').value = '';
			
			// stop form froming submitting
			return false;
        };
    });

    // when a new message is announced, add to list
    socket.on('announce', data => {
		const li = document.createElement('li');
		li.innerHTML = `${data.selection}`;
		document.querySelector('#messages').append(li);

    });
	
	// return false;

});

