	window.onload = start;
	
	function start(){
				document.getElementById("btnKjop").onclick = addToCheckout;
				document.getElementById("checkout").onclick = payAndDelivery;
				document.getElementById("selProd").onchange = addProdNum;

	}
	function addToCheckout(){
			prodnum= document.getElementById("btnKjop").value;
			alert("du har valgt produkt " + prodnum+ ", legg til dette nummeret på neste side");
			window.location.assign("../../checkout/checkout.html");
	}
	function addProdNum(){
		var prodnum = document.getElementById("selProd").value;
		document.getElementById("prdNum").innerHTML = prodnum;
	}
	function payAndDelivery(){
		var produkt= document.getElementById("selProd").value;
		alert("du har kjøpt " + produkt + " og den forventes levert imorgen");
	}