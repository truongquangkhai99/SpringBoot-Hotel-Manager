$(document).ready(() => {
    $.ajax({
        url: "http://localhost:8080/rooms",
        dataType: 'JSON'
    }).done(function(data) {
        console.log(data);
        $.each(data, (index, value) => {
            room_dom(value);
        });
    });
   
    // Deleting room entry.
    $('.room-entries').on("click", ".btn-danger", function() {
        console.log("attempted to delete room");
        let room_ref = $(this);
        delete_room(room_ref);
    });

    // Editing room entry with contenteditable.
    let actual_blur;
    $('.room-entries').on('focus', '[contenteditable]' ,function() {
        // Save the original state of the room before editing anything.
        actual_blur = true;
        console.log("Focused.")
        $(this).attr('before', $(this).html());

    // Why do I have to repeat '[contenteditable]'???
    }).on('blur', '[contenteditable]', function() {
        let room_cache = $(this).attr('before');
        // Need to edit html directly, not the value = html val attribute.
      
        if(actual_blur) { 
            $(this).html(room_cache); 
        }

    }).on('keypress', '[contenteditable]', function(e) {
        var key = e.keyCode || e.which;
        // If user presses enter, which is 13 across many browsers.
        if(key === 13) {
            // Change HTML to new value, then submit AJAX PUT request.
            actual_blur = false;
            $(this).blur(); // Prevents from newline.

            let parsed = edit_parser($(this).closest('tr'));

            edit_room(parsed[0], parsed[1]);
        }
    })

    $('.room-entries').on('dblclick', 'i', function() {
        // Logic for checking what is currently the availability through the DOM.
        let attr_bool = $(this).attr('availability');
        attr_bool === 'true' ? $(this).attr('availability', 'false') : $(this).attr('availability', 'true');

        // This will 
        $(this).toggleClass('fa-check fa-times');

        let parsed = edit_parser($(this).closest('tr'));
        edit_room(parsed[0], parsed[1]);
    })

    // Focus does not work here, because AJAX is async and we are dynamically adding content..

    $("form").submit(function(event) {
        const room_obj = {};

        event.preventDefault();
        
        let s_data = $(this).serializeArray();
  
        $.each(s_data, function() {
            if(this.name === "availability") {
                this.value = true;
            }
            room_obj[this.name] = this.value;
        });

        //console.log(JSON.stringify(room_obj));
        add_room(room_obj);
    });

});

edit_parser = (room) => {
    const room_obj = {};
    let id;

    room.children('td:lt(5)').each(function(index) {
        if(index === 4) { 
            id = $(this).children().attr('button-id');
            return;
        }
        if($(this).children().length > 0) {
            let status = $(this).children(":first").attr('availability');
            room_obj['availability'] = status;
            return;
        }
              
        let name = $(this).attr('name');
        let text_val = $(this).text();
            
        room_obj[name] = text_val;
    });

    return [room_obj, id];
}


// Adds a room object directly to the DOM.
room_dom = (entry) => {
   // console.log("attempted to add room to dom");
    console.log(entry.id);
    let a_status = (entry.availability) ? "check" : "times";
    let a_icon = $(`<i class = "fas fa-${a_status}"></i>`);
    let delete_button = $('<button type="button" id = "e" class="btn btn-danger">Delete</button>');

    delete_button.attr('button-id', entry.id);
    a_icon.attr('availability', entry.availability);
    // Need to give variables a jQuery wrapper aka $()
    let room_entry = $('<tr><td contenteditable = "true" name = "roomNum">' + entry.roomNum + '</td><td contenteditable = "true" name = "nightlyPrice">' 
                        + entry.nightlyPrice + '</td><td contenteditable = "true" name = "type">' + entry.type + '</td><td>' + 
                        a_icon.get(0).outerHTML + '</td><td>' + delete_button.prop('outerHTML') + '</td></tr>');

    
    //console.log(delete_button.attr('button-id'));
    $('.room-entries').append(room_entry);
}

// Deletes room from DB and from DOM.
delete_room = (room) => {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/rooms/" + room.attr('button-id'),
        success: console.log("deleted!")
    }).done(() => {
        room.closest('tr').remove();
    });
}

// Adds room to the DB and adds to the DOM.
add_room = (add_data) => {
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/rooms/",
        data: JSON.stringify(add_data),
        contentType: 'application/json',
        success: (id_post) => {
            add_data['id'] = id_post;
        }
    }).done(() => {
        room_dom(add_data);
    })
}

edit_room = (room, id) => {
    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/rooms/" + id,
        data: JSON.stringify(room),
        contentType: 'application/json', 
    })
}