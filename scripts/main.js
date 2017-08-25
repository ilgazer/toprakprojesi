
'use strict';

function PageScript() {
	this.bolge = $('.bolge');
	this.bitki = $('.bitki');
	this.organik = $('.organik');
	this.sonuc = $('.sonuc');
	this.bolgeSelect=$('select[name="bolgeSelect"]');
	this.bitkiSelect=$('select[name="bitkiSelect"]');
	this.organikSelect=$('select[name="organikSelect"]');
	this.sonucBox = $('.sonucBox');
	this.bolgeSelect.change(this.onSelectBolge.bind(this));
	this.bitkiSelect.change(this.onSelectBitki.bind(this));
	this.organikSelect.change(this.onSelectOrganik.bind(this));
	Papa.parse("data/gubre-azot.csv", {
		download: true,
		complete: function(results) {
			this.gubre=results.data;
			console.log(this.gubre);
		}.bind(this)
	});
}

PageScript.prototype.onSelectBolge = function() {
	this.bitkiSelect.empty();
	this.bitkiSelect.append('<option value=""></option>')
	this.sonucBox.empty();
	this.bitki.hide();
	this.organik.hide();
	this.sonuc.hide()
	Papa.parse("data/"+this.bolgeSelect.val()+"-azot.csv", {
		download: true,
		complete: function(results) {
			console.log(results);
			this.bolgeData=results.data;
			this.bolgeBitki=[];
			for(let i=0;i<this.bolgeData.length; i++) {
				let value=this.bolgeData[i][0];
				this.bolgeBitki.push(value);
				this.bitkiSelect.append('<option value=' + i + '>' + value + '</option>');
			};
			this.bitki.show();
		}.bind(this)
	});	
};
PageScript.prototype.onSelectBitki = function() {
	this.bitkiData=this.bolgeData[this.bitkiSelect.val()];
	this.organik.show();
	this.onSelectOrganik();
};
PageScript.prototype.onSelectOrganik = function() {
	if(this.organikSelect.val()=='NO-OP'){
		return;
	}
	this.sonuc.show();
	this.sonucBox.empty();
	let safazot = parseFloat(this.bitkiData[this.organikSelect.val()]);
	for(let i=0;i<this.gubre.length-1; i++) {
		let katsayi = parseFloat(this.gubre[i][1])
		this.sonucBox.append(this.gubre[i][0] + ": " + safazot*katsayi + "kg / 1 dekar (1 dönüm) arazi<br><br>");
	}
}

window.onload = function() {
  window.PageScript = new PageScript();
};
