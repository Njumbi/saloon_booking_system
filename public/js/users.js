$('document').ready(() => {
    fetchUser()
    addUser()
})

const fetchUser = () => {
    var table = $('#users_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/users/data'
        },
        "columns": [{
                'data': "name",
                "defaultContent": "",
                "title": "Name"
            },
            {
                'data': "email",
                "defaultContent": "",
                "title": "Email "
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='delete' class='btn btn-danger'>Delete!</button>"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='edit' class='btn btn-info'>Edit!</button>"
            },

        ]
    })
}

const addUser = () => {
    $('#add_user_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add User",
            text: "This user will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            //collect data from the form
            const csurf = $('#csrf').val();
            const name = $('#name').val()
            const email = $('#email').val()
            const password = $('#password').val()

            //convert to json
            const data = {
                "_csrf": csurf,
                "name": name,
                "email": email,
                "password": password
            }
            //send data to your controller
            $.post('/users/add', data, (data, status) => {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#users_table").DataTable().ajax.reload(null, false);
                    $('#addUserModal').modal('hide');
                    $('#add_user_form')[0].reset()
                } else {
                    swal("Error", data.message, "error")
                    $('#addUserModal').modal('hide');
                    $('#add_user_form')[0].reset()
                }

            })

        })


    })

}