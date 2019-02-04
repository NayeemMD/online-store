$(document).ready(function () {
 console.log("you might be happy to see");
 var count = 1;
  $("#addEntry").on("click", function () {
         var newRow = $('<tr>');
         var cols = "";
         cols += '<td>Item :'</td>';
         cols += '<td><select name="items" class="form-control">'
                                          +'<option></option>'
                                          +'<option value="tshirt">T-shirt</option>'
                                          +'<option value="pant">Pant</option>'
                                          +'<option value="hat">Hat</option>'
                                      +'</select>'
                                      +'</td>';
          cols += ' <td><input type = "button" class="btn btn-warning" id="removeEntry" value="Remove Entry"> </input></td>';
         newRow.append(cols);
         $("table.listOfGoods").append(newRow);

     });
    $("table.listOfGoods").on("click", "#removeEntry", function () {
        if(confirm("Are you sure, you want to delete?")){
         $(this).closest("tr").remove();
        }
    });
});