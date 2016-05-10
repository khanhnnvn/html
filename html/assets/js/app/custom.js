/************************************
    Toggle Column
    ************************************/
var toggleColumnTable = $('#toggleColumn-datatable').DataTable();
$('a.toggle-vis').on('click', function(e) {
    e.preventDefault();
    // Get the column API object
    var column = toggleColumnTable.column($(this).attr('data-column'));
    // Toggle the visibility
    column.visible(!column.visible());
});
/* Formatting function for row details - modify as you need */
function format(d) {
    return '<h3>Last Transaction in 7 days</h3>' + '<span class="ip_uniqid_' + d.id + '"></span>';
}
var table = $('#dashboard-datatable').DataTable({
    "ajax": "assets/js/app/objects.txt",
    "bSort": false,
    "columns": [{
        "class": 'details-control',
        "data": null,
        "defaultContent": '<a class="btn btn-link"><i class="fa fa-plus-square"></i></a>',
        "searchable": false
    }, {
        "data": "ip_address"
    }, {
        "data": "ping_time",
        render: function(data) {
            return '<label class="label label-primary">' + data + '</label>';
        },
        "searchable": false
    }, {
        "data": "updated_at"
    }, {
        "searchable": false,
        "data": "ip_status",
        render: function(data) {
            if (data == "online") {
                return '<i class="fa fa-3x fa-arrow-circle-up text-success"></i>';
            } else if (data == "offline") {
                return '<i class="fa fa-3x fa-arrow-circle-down text-danger"></i>';
            }
        }
    }]
});
// Add event listener for opening and closing details
$('#dashboard-datatable tbody').on('click', 'td', function() {
    var tr = $(this).closest('tr');
    var row = table.row(tr);
    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    } else {
        // Open this row
        var data = row.data();
        row.child(format(data)).show();
        Pace.restart();
        // ajax get transaction 7 day
        $.ajax({
            url: 'assets/js/app/transaction.txt',
            type: "GET",
            dataType: "json",
            success: function(response) {
                //called when successful
                $(".ip_uniqid_" + data.id).sparkline(response.transaction, {
                    type: 'bar',
                    height: '60',
                    barColor: '#439704',
                    negBarColor: '#e9573f',
                    barWidth: '30'
                });
            },
            error: function(e) {
                //called when there is an error
                console.log(e.message);
            }
        });
        tr.addClass('shown');
    }
});
$("#view_history_btn").on('click', function() {
    var date_history = $("#view_history_date").val();
    var ip_history = $("#view_history_ip").val();
    if (date_history === '' && ip_history === '') {
        alert('Please select IP & Date');
    } else {
        // $('#history-datatable').DataTable().fnClearTable();
        $('#history-datatable').DataTable({
            "ajax": "assets/js/app/objects.txt",
            "bSort": false,
            "bDestroy": true,
            "columns": [{
                "class": 'details-control',
                "data": null,
                "defaultContent": '<a class="btn btn-link"><i class="fa fa-plus-square"></i></a>',
                "searchable": false
            }, {
                "data": "ip_address"
            }, {
                "data": "ping_time",
                render: function(data) {
                    return '<label class="label label-primary">' + data + '</label>';
                },
                "searchable": false
            }, {
                "data": "updated_at"
            }, {
                "searchable": false,
                "data": "ip_status",
                render: function(data) {
                    if (data == "online") {
                        return '<i class="fa fa-3x fa-arrow-circle-up text-success"></i>';
                    } else if (data == "offline") {
                        return '<i class="fa fa-3x fa-arrow-circle-down text-danger"></i>';
                    }
                }
            }]
        });
    }
});