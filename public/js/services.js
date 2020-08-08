$('document').ready(() => {
    fetchService()
    addService()
})

const fetchService = () => {
    var table = $('#services_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/services/data'
        },
        "columns": [{
                'data': "service",
                "defaultContent": "",
                "title": "Service"
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

const addService = () => {
    $('#add_user_services_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Service",
            text: "This service will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            //collect data from the form
            const csurf = $('#csrf').val();
            const services = $('#services').val()

            //convert to json
            const data = {
                "_csrf": csurf,
                "services": services,
            }
            //send data to your controller
            $.post('/services/add', data, (data, status) => {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#services_table").DataTable().ajax.reload(null, false);
                    $('#addServiceModal').modal('hide');
                    $('#add_user_services_form')[0].reset()
                } else {
                    swal("Error", data.message, "error")
                    $('#addServiceModal').modal('hide');
                    $('#add_user_services_form')[0].reset()
                }

            })

        })


    })

}