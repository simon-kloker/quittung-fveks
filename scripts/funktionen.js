
kommazahl = 0;
nkommazahl = 0;
brutto = false;
netto = false;
prozentklick = true;
calc = false;
myfocus=0;

function ProzentEingabe(prozent) {
	prozent = prozent.replace(/\,/,".");
	if (prozent == "" || isNaN(prozent) == true) {
		prozentklick = false;
		return false;
	} else {
		prozentklick = true;
		prozent = Math.round(prozent*10);
		if (prozent < 0) prozent = prozent * -1;
		if (prozent > 9) prozent = parseInt(prozent)/10;
		prozentmk = prozent.toString();
		prozentmk = prozentmk.replace(/\./,",");
		document.eingabe.prozent.value = prozentmk;		
		RechneProzent(prozent);
	}
}

function BruttoEingabe(zahl) {
	sucheleer = zahl.indexOf(" ");
	if (zahl == "" ||  sucheleer != -1) {
		loeschebrutto();
		return false;
	} else {
		brutto = true;
		netto = false;
		ToWords(zahl);
		if (prozentklick) {
			prozent = document.eingabe.prozent.value;
			prozent = prozent.replace(/\,/,".");
			RechneProzent(prozent);
		}
	}
}

function NettoEingabe(nettozahl) {
	sucheleer = nettozahl.indexOf(" ");
	if (nettozahl == "" ||  sucheleer != -1) {
		loeschenetto();
		return false;
	} else {
		netto = true;
		brutto = false;
		RechneNetto(nettozahl);
	}
}

function loeschebrutto() {
	rechenzahl = "";
	brutto = false;	
	if (calc) {
		prozentklick = false;
		document.eingabe.worte.value = "";
		document.eingabe.mwst.value = "";
		document.eingabe.netto.value = "";
		document.eingabe.prozent.value = "";
		calc = false;
	}
}

function loeschenetto() {
	rechenzahl = "";
	brutto = false;
	netto = false;
	if (calc) {	
		prozentklick = false;
		document.eingabe.worte.value = "";
		document.eingabe.mwst.value = "";
		document.eingabe.gesamt.value = "";
		document.eingabe.prozent.value = "";
		calc = false;
	}
}

function ToWords(zahl) {
	rechenzahl = zahl;
	rechenzahl = rechenzahl.replace(/\,/,".");
	zahl = zahl.replace(/\./,",");
	document.eingabe.gesamt.value = zahl;
 	if (isNaN(zahl) == true) {
		eurocent = zahl.split(',');
		if (isNaN(eurocent[0]) == true || isNaN(eurocent[1]) == true) {
			loeschebrutto();
			return false;
		}
		if (eurocent[1].length > 2) {
			loeschebrutto();
			return false;
		}
		if (eurocent[1].length == 0) {
			loeschebrutto();
			return false;
		}		
		if (eurocent.length > 2) {
			loeschebrutto();
			return false;
		}
		if (eurocent[1].length < 1) kommazahl = 2;		
		if (eurocent[1].length == 1) kommazahl = 1;
		zahl = eurocent[0];
		TuEs(zahl)
	} else {
		kommazahl = 2;
		TuEs(zahl)
	}
}

function RechneNetto(nettozahl) {
	rechennettozahl = nettozahl;
	rechennettozahl = rechennettozahl.replace(/\,/,".");
	nettozahl = nettozahl.replace(/\./,",");
	document.eingabe.netto.value = nettozahl;
 	if (isNaN(nettozahl) == true) {
		neurocent = nettozahl.split(',');
		if (isNaN(neurocent[0]) == true || isNaN(neurocent[1]) == true) {
			loeschenetto();
			return false;
		}
		if (neurocent[1].length > 2) {
			loeschenetto();
			return false;
		}
		if (neurocent[1].length == 0) {
			loeschenetto();
			return false;
		}		
		if (neurocent.length > 2) {
			loeschenetto();
			return false;
		}
		if (neurocent[1].length < 1) nkommazahl = 2;		
		if (neurocent[1].length == 1) nkommazahl = 1;
		nettozahl = neurocent[0];
	} else {
		nkommazahl = 2;
	}
	if (nkommazahl == 2) document.eingabe.netto.value = document.eingabe.netto.value + ",00";
	if (nkommazahl == 1) document.eingabe.netto.value = document.eingabe.netto.value + "0";
	nkommazahl = 0;
	if (prozentklick) {
		prozent = document.eingabe.prozent.value;
		prozent = prozent.replace(/\,/,".");
		RechneProzent(prozent);
	}
}

function RechneProzent(prozent) {
	if (brutto) {
		calc = true;
		//prozent = parseInt(prozent);
		teiler = (1000 + prozent*10)/1000;
		nettoausgabe = rechenzahl/teiler;
		prozentausgabe = rechenzahl - nettoausgabe;
		
		nettoausgabe = Math.round(nettoausgabe*100);
		nettoausgabe = parseInt(nettoausgabe)/100;
		prozentausgabe = rechenzahl - nettoausgabe;
		prozentausgabe = Math.round(prozentausgabe*100);
		prozentausgabe = parseInt(prozentausgabe)/100;		
		
			nettoausgabetest = parseInt(nettoausgabe);
			mkomma = nettoausgabe - nettoausgabetest;
			mkomma = Math.round(mkomma*100);
			mkomma = parseInt(mkomma)/100;
			mnkomma = mkomma;
			mkomma = mkomma.toString();
			mkomma = mkomma.length;
			mkomma = parseInt(mkomma);
			if (mkomma == 1) nettoausgabe = nettoausgabe.toString() + ".00";
			else if (mkomma == 2 || (mkomma == 3 && mnkomma < 1 && mnkomma*10 == parseInt(mnkomma*10))) nettoausgabe = nettoausgabe.toString() + "0";
			else nettoausgabe = nettoausgabe.toString();
			nettoausgabe = nettoausgabe.replace(/\./,",");

			prozentausgabetest = parseInt(prozentausgabe);
			mkomma = prozentausgabe - prozentausgabetest;
			mkomma = Math.round(mkomma*100);
			mkomma = parseInt(mkomma)/100;
			mnkomma = mkomma;
			mkomma = mkomma.toString();
			mkomma = mkomma.length;
			mkomma = parseInt(mkomma);
			if (mkomma == 1) prozentausgabe = prozentausgabe.toString() + ".00";
			else if (mkomma == 2 || (mkomma == 3 && mnkomma < 1 && mnkomma*10 == parseInt(mnkomma*10))) prozentausgabe = prozentausgabe.toString() + "0";
			else prozentausgabe = prozentausgabe.toString();
			prozentausgabe = prozentausgabe.replace(/\./,",");
		
				
		document.eingabe.netto.value = nettoausgabe;
		document.eingabe.mwst.value = prozentausgabe;
	}
	if (netto) {
		calc = true;
		//prozent = parseInt(prozent);
		rechennettozahl= parseFloat(rechennettozahl);
		prozentausgabe = rechennettozahl*prozent/100;
		bruttoausgabe = rechennettozahl + prozentausgabe;
		bruttoausgabe = Math.round(bruttoausgabe*100);
		bruttoausgabe = parseInt(bruttoausgabe)/100;
		prozentausgabe = Math.round(prozentausgabe*100);
		prozentausgabe = parseInt(prozentausgabe)/100;		
		
			bruttoausgabetest = parseInt(bruttoausgabe);
			mkomma = bruttoausgabe - bruttoausgabetest;
			mkomma = Math.round(mkomma*100);
			mkomma = parseInt(mkomma)/100;
			mnkomma = mkomma;
			mkomma = mkomma.toString();
			mkomma = mkomma.length;
			mkomma = parseInt(mkomma);
			if (mkomma == 1) bruttoausgabe = bruttoausgabe.toString() + ".00";
			else if (mkomma == 2 || (mkomma == 3 && mnkomma < 1 && mnkomma*10 == parseInt(mnkomma*10))) bruttoausgabe = bruttoausgabe.toString() + "0";
			else bruttoausgabe = bruttoausgabe.toString();
			bruttoausgabe = bruttoausgabe.replace(/\./,",");

			prozentausgabetest = parseInt(prozentausgabe);
			mkomma = prozentausgabe - prozentausgabetest;
			mkomma = Math.round(mkomma*100);
			mkomma = parseInt(mkomma)/100;
			mnkomma = mkomma;
			mkomma = mkomma.toString();
			mkomma = mkomma.length;
			mkomma = parseInt(mkomma);
			if (mkomma == 1) prozentausgabe = prozentausgabe.toString() + ".00";
			else if (mkomma == 2 || (mkomma == 3 && mnkomma < 1 && mnkomma*10 == parseInt(mnkomma*10))) prozentausgabe = prozentausgabe.toString() + "0";
			else prozentausgabe = prozentausgabe.toString();
			prozentausgabe = prozentausgabe.replace(/\./,",");			
				
		document.eingabe.gesamt.value = bruttoausgabe;
		document.eingabe.mwst.value = prozentausgabe;
		beurocent = bruttoausgabe.split(',');
		bzahl = beurocent[0];
		TuEs(bzahl);
	}	
}

function TuEs(zahl) {
minus = false;
ausgabe = document.eingabe.worte;
ausgabe.value = "";
if (zahl < 0) {
    minus = true;
    zahl = zahl * -1;
}
zahlwort = zahl.toString();
if (zahlwort == "") rueckgabe("Bitte geben Sie eine Zahl ein.");

woerter = new Array();
woerter[0] = "null";
woerter[1] = "eins";
woerter[2] = "zwei";
woerter[3] = "drei";
woerter[4] = "vier";
woerter[5] = "fünf";
woerter[6] = "sechs";
woerter[7] = "sieben";
woerter[8] = "acht";
woerter[9] = "neun";
woerter[10] = "zehn";
woerter[11] = "elf";
woerter[12] = "zwölf";
woerter[13] = "dreizehn";
woerter[14] = "vierzehn";
woerter[15] = "fünfzehn";
woerter[16] = "sechzehn";
woerter[17] = "siebzehn";
woerter[18] = "achtzehn";
woerter[19] = "neunzehn";
woerter[20] = "zwanzig";
woerter[21] = "ein";
woerter[22] = "eine";
woerter[30] = "dreißig";
woerter[40] = "vierzig";
woerter[50] = "fünfzig";
woerter[60] = "sechzig";
woerter[70] = "siebzig";
woerter[80] = "achtzig";
woerter[90] = "neunzig";
woerter[100] = "hundert";
woerter[1000] = "tausend";
woerter[1000000] = "million";
woerter[1000001] = "millionen";
woerter[1000000000] = "milliarde";
woerter[1000000001] = "milliarden";

laenge = zahlwort.length;

// Die Einser

if (laenge < 2 && zahlwort != "") {
    wort = woerter[zahl];
    rueckgabe(wort);
} 

// Die Zehner

if (laenge == 2) {
    pufferzahlwort = zahlwort;
    mache_zehner(pufferzahlwort);
    wort = zehnerwort;
    rueckgabe(wort);
}

// Die Hunderter;

if (laenge == 3) {
    pufferzahlwort = zahlwort;
    mache_hunderter(pufferzahlwort);
    pufferzahlwort = zahlwort.substring(1,3);
    mache_zehner(pufferzahlwort)
    wort = hunderterwort + zehnerwort;
    rueckgabe(wort);
} 

// Die Tausender

if (laenge == 4) {
    pufferzahlwort = zahlwort;
    mache_tausender(zahlwort);
    pufferzahlwort = zahlwort.substring(1,4);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(2,4);
    mache_zehner(pufferzahlwort)
    wort = tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

// Die Zehntausender

if (laenge == 5) {
    tausenderwort = "";
    pufferzahlwort = zahlwort.substring(0,2);
    mache_zehntausender(pufferzahlwort);
    pufferzahlwort = zahlwort.substring(2,5);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(3,5);
    mache_zehner(pufferzahlwort)
    wort = zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

// Die Hunderttausender

if (laenge == 6) {
    pufferzahlwort = zahlwort.substring(0,1);
    mache_hunderttausender(pufferzahlwort);
    if (zahlwort.charAt(1) != "0") {
        tausenderwort = "";
        pufferzahlwort = zahlwort.substring(1,3);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(2,6);
        mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(3,6);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(4,6);
    mache_zehner(pufferzahlwort)
    wort = hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

if (laenge == 7) {
    tausenderwort = "";
    pufferzahlwort = zahlwort.substring(0,1);
    mache_millionen(pufferzahlwort);
    pufferzahlwort = zahlwort.substring(1,2);
    if (pufferzahlwort != "0") {
        mache_hunderttausender(pufferzahlwort);
    } else {
    hunderttausenderwort = "";
    }
    if (zahlwort.charAt(2) != "0") {
        pufferzahlwort = zahlwort.substring(2,4);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(3,7);
        if (pufferzahlwort.charAt(0) != "0") mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(4,7);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(5,7);
    mache_zehner(pufferzahlwort)
    wort = millionenwort + hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

if (laenge == 8) {
    tausenderwort = "";
    pufferzahlwort = zahlwort.substring(0,2);
    mache_zehnmillionen(pufferzahlwort);
    pufferzahlwort = zahlwort.substring(2,3);
    if (pufferzahlwort != "0") {
        mache_hunderttausender(pufferzahlwort);
    } else {
    hunderttausenderwort = "";
    }
    if (zahlwort.charAt(3) != "0") {
        pufferzahlwort = zahlwort.substring(3,5);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(4,8);
        if (pufferzahlwort.charAt(0) != "0") mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(5,8);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(6,8);
    mache_zehner(pufferzahlwort)
    wort = millionenwort + hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

if (laenge == 9) {
    tausenderwort = "";
    millionenwort = woerter[1000001];
    pufferzahlwort = zahlwort.substring(0,1);
    mache_hundertmillionen(pufferzahlwort);
    if (zahlwort.charAt(1) != "0") {
        pufferzahlwort = zahlwort.substring(1,3);
        mache_zehnmillionen(pufferzahlwort);
    } else
    if (zahlwort.charAt(2) != "0") {
        pufferzahlwort = zahlwort.substring(2,3);
        mache_millionen(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(3,4);
    if (pufferzahlwort != "0") {
        mache_hunderttausender(pufferzahlwort);
    } else {
    hunderttausenderwort = "";
    }
    if (zahlwort.charAt(4) != "0") {
        pufferzahlwort = zahlwort.substring(4,6);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(5,9);
        if (pufferzahlwort.charAt(0) != "0") mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(6,9);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(7,9);
    mache_zehner(pufferzahlwort)
    wort = hundertmillionenwort + millionenwort + hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

if (laenge == 10) {
    tausenderwort = "";
    millionenwort = woerter[1000001];
    hundertmillionenwort = "";
    pufferzahlwort = zahlwort.substring(0,1);
    mache_milliarden(pufferzahlwort);
    pufferzahlwort = zahlwort.substring(1,2);
    if (pufferzahlwort != "0") {
        mache_hundertmillionen(pufferzahlwort);
    } else {
        millionenwort = "";
    }
    if (zahlwort.charAt(2) != "0") {
        pufferzahlwort = zahlwort.substring(2,4);
        mache_zehnmillionen(pufferzahlwort);
    } else
    if (zahlwort.charAt(3) != "0") {
        pufferzahlwort = zahlwort.substring(3,4);
        mache_millionen(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(4,5);
    if (pufferzahlwort != "0") {
        mache_hunderttausender(pufferzahlwort);
    } else {
    hunderttausenderwort = "";
    }
    if (zahlwort.charAt(5) != "0") {
        pufferzahlwort = zahlwort.substring(5,7);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(6,10);
        if (pufferzahlwort.charAt(0) != "0") mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(7,10);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(8,10);
    mache_zehner(pufferzahlwort)
    wort = milliardenwort + hundertmillionenwort + millionenwort + hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

if (laenge == 11) {
    tausenderwort = "";
    millionenwort = woerter[1000001];
    hundertmillionenwort = "";
    pufferzahlwort = zahlwort.substring(0,2);
    mache_zehnmilliarden(pufferzahlwort);
    pufferzahlwort = zahlwort.substring(2,3);
    if (pufferzahlwort != "0") {
        mache_hundertmillionen(pufferzahlwort);
    } else {
        millionenwort = "";
    }
    if (zahlwort.charAt(3) != "0") {
        pufferzahlwort = zahlwort.substring(3,5);
        mache_zehnmillionen(pufferzahlwort);
    } else
    if (zahlwort.charAt(4) != "0") {
        pufferzahlwort = zahlwort.substring(4,5);
        mache_millionen(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(5,6);
    if (pufferzahlwort != "0") {
        mache_hunderttausender(pufferzahlwort);
    } else {
    hunderttausenderwort = "";
    }
    if (zahlwort.charAt(6) != "0") {
        pufferzahlwort = zahlwort.substring(6,8);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(7,11);
        if (pufferzahlwort.charAt(0) != "0") mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(8,11);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(9,11);
    mache_zehner(pufferzahlwort)
    wort = milliardenwort + hundertmillionenwort + millionenwort + hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

if (laenge == 12) {
    tausenderwort = "";
    millionenwort = woerter[1000001];
    hundertmillionenwort = "";
    milliardenwort = woerter[1000000001];
    pufferzahlwort = zahlwort.substring(0,1);
    mache_hundertmilliarden(pufferzahlwort);
    if (zahlwort.charAt(1) != "0") {
        pufferzahlwort = zahlwort.substring(1,3);
        mache_zehnmilliarden(pufferzahlwort);
    } else
    if (zahlwort.charAt(2) != "0") {
        pufferzahlwort = zahlwort.substring(2,3);
        mache_milliarden(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(3,4);
    if (pufferzahlwort != "0") {
        mache_hundertmillionen(pufferzahlwort);
    } else {
        millionenwort = "";
    }
    if (zahlwort.charAt(4) != "0") {
        pufferzahlwort = zahlwort.substring(4,6);
        mache_zehnmillionen(pufferzahlwort);
    } else
    if (zahlwort.charAt(5) != "0") {
        pufferzahlwort = zahlwort.substring(5,6);
        mache_millionen(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(6,7);
    if (pufferzahlwort != "0") {
        mache_hunderttausender(pufferzahlwort);
    } else {
    hunderttausenderwort = "";
    }
    if (zahlwort.charAt(7) != "0") {
        pufferzahlwort = zahlwort.substring(7,9);
        mache_zehntausender(pufferzahlwort);
    } else {
        zehntausenderwort = "";
        pufferzahlwort = zahlwort.substring(8,12);
        if (pufferzahlwort.charAt(0) != "0") mache_tausender(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(9,12);
    if (pufferzahlwort.charAt(0) == 0) {
        hunderterwort = "";   
    } else {
        mache_hunderter(pufferzahlwort);
    }
    pufferzahlwort = zahlwort.substring(10,12);
    mache_zehner(pufferzahlwort)
    wort = hundertmilliardenwort + milliardenwort + hundertmillionenwort + millionenwort + hunderttausenderwort + zehntausenderwort + tausenderwort + hunderterwort + zehnerwort;
    rueckgabe(wort);
}

// Nu is aber gut

if (laenge > 12) {
    app.alert("Die Zahl ist zu lang zum umwandeln" + laenge);
}
}

// Die Zehnerfunktion

function mache_zehner(pufferzahlwort) {
    zehnerzahl = parseInt(pufferzahlwort);
    if ((pufferzahlwort.charAt(0) == "0") && (pufferzahlwort.charAt(1) != "0")) {
        zehnerzahl = parseInt(pufferzahlwort.charAt(1));
    }
    if ((pufferzahlwort.charAt(0) == "0") && (pufferzahlwort.charAt(1) == "0")) {
        zehnerwort = "";
    } else
    if (zehnerzahl < 21) {
        zehnerwort = woerter[zehnerzahl];
    } else {
        zehner = pufferzahlwort.charAt(0);
        zehner = parseInt(zehner);
        zehner = zehner * 10;
        einser = pufferzahlwort.charAt(1);
        einser = parseInt(einser);
        if (einser == 1) einser = 21;
        zehnerwort = woerter[einser] + "und" + woerter[zehner];
        if (einser == 0) zehnerwort = woerter[zehner];
    }
    return zehnerwort;
}

// Die Hunderterfunktion

function mache_hunderter(pufferzahlwort) {
    hunderter = pufferzahlwort.charAt(0);
    hunderter = parseInt(hunderter);
    if (hunderter == 1) {
        hunderter = 21;
    }
    hunderterwort = woerter[hunderter] + woerter[100];
    return hunderterwort;
}
    
// Die Tausenderfunktion

function mache_tausender(pufferzahlwort) {
    tausender = pufferzahlwort.charAt(0);
    tausender = parseInt(tausender);
    if (tausender == 1) {
        tausender = 21;
    }
    tausenderwort = woerter[tausender] + woerter[1000];
    if (tausender == 0) tausenderwort = woerter[1000];
    return tausenderwort;
}

// Die Zehntausenderfunktion

function mache_zehntausender(pufferzahlwort) {
    zehntausenderzahl = parseInt(pufferzahlwort);
    if (zehntausenderzahl < 21) {
        zehntausenderwort = woerter[zehntausenderzahl];
    } else {
        tzehner = pufferzahlwort.charAt(0);
        tzehner = parseInt(tzehner);
        tzehner = tzehner * 10;
        teinser = pufferzahlwort.charAt(1);
        teinser = parseInt(teinser);
        if (teinser == 1) teinser = 21;
        zehntausenderwort = woerter[teinser] + "und" + woerter[tzehner];
        if (teinser == 0) zehntausenderwort = woerter[tzehner];
    }
    zehntausenderwort = zehntausenderwort + woerter[1000];
    return zehntausenderwort;
}

// Die Hunderttausenderfunktion

function mache_hunderttausender(pufferzahlwort) {
    thunderter = pufferzahlwort.charAt(0);
    thunderter = parseInt(thunderter);
    if (thunderter == 1) {
        thunderter = 21;
    }
    hunderttausenderwort = woerter[thunderter] + woerter[100];
    return hunderttausenderwort;
}

// Die Millionenfunktion

function mache_millionen(pufferzahlwort) {
    millionen = parseInt(pufferzahlwort);
    if (millionen == 1) {
        millionenwort = woerter[22] + woerter[1000000];
    } else {
    millionenwort = woerter[millionen] + woerter[1000001];
    }
    return millionenwort;
}

// Die Zehnmillionenfunktion

function mache_zehnmillionen(pufferzahlwort) {
    zehnmillionenzahl = parseInt(pufferzahlwort);
    if (zehnmillionenzahl < 21) {
        millionenwort = woerter[zehnmillionenzahl];
    } else {
        mzehner = pufferzahlwort.charAt(0);
        mzehner = parseInt(mzehner);
        mzehner = mzehner * 10;
        meinser = pufferzahlwort.charAt(1);
        meinser = parseInt(meinser);
        if (meinser == 1) meinser = 21;
        millionenwort = woerter[meinser] + "und" + woerter[mzehner];
        if (meinser == 0) millionenwort = woerter[mzehner];
    }
    millionenwort = millionenwort + woerter[1000001];
    return millionenwort;
}

// Die Hundermillionenfunktion

function mache_hundertmillionen(pufferzahlwort) {
    mhunderter = pufferzahlwort.charAt(0);
    mhunderter = parseInt(mhunderter);
    if (mhunderter == 1) {
        mhunderter = 21;
    }
    hundertmillionenwort = woerter[mhunderter] + woerter[100];
    return hundertmillionenwort;
}

// Die Milliardenfunktion

function mache_milliarden(pufferzahlwort) {
    milliarden = parseInt(pufferzahlwort);
    if (milliarden == 1) {
        milliardenwort = woerter[22] + woerter[1000000000];
    } else {
    milliardenwort = woerter[milliarden] + woerter[1000000001];
    }
    return milliardenwort;
}

// Die Zehnmilliardenfunktion

function mache_zehnmilliarden(pufferzahlwort) {
    zehnmilliardenzahl = parseInt(pufferzahlwort);
    if (zehnmilliardenzahl < 21) {
        milliardenwort = woerter[zehnmilliardenzahl];
    } else {
        mrdzehner = pufferzahlwort.charAt(0);
        mrdzehner = parseInt(mrdzehner);
        mrdzehner = mrdzehner * 10;
        mrdeinser = pufferzahlwort.charAt(1);
        mrdeinser = parseInt(mrdeinser);
        if (mrdeinser == 1) mrdeinser = 21;
        milliardenwort = woerter[mrdeinser] + "und" + woerter[mrdzehner];
        if (mrdeinser == 0) milliardenwort = woerter[mrdzehner];
    }
    milliardenwort = milliardenwort + woerter[1000000001];
    return milliardenwort;
}

// Die Hundermilliardenfunktion

function mache_hundertmilliarden(pufferzahlwort) {
    mrdhunderter = pufferzahlwort.charAt(0);
    mrdhunderter = parseInt(mrdhunderter);
    if (mrdhunderter == 1) {
        mrdhunderter = 21;
    }
    hundertmilliardenwort = woerter[mrdhunderter] + woerter[100];
    return hundertmilliardenwort;
}

// Die Ausgabefunktion

function rueckgabe(wort) {
    wortlaenge = wort.length;
    anfang = wort.charAt(0);
    gross = anfang.toUpperCase();
    wort = wort.substring(1,wortlaenge);
    wort = gross + wort;
    if (minus) {
        wort = "Minus " + wort;
    }
	if (wortlaenge > 45) wort = "";
    ausgabe.value = wort;
	if (kommazahl == 2) document.eingabe.gesamt.value = document.eingabe.gesamt.value + ",00";
	if (kommazahl == 1) document.eingabe.gesamt.value = document.eingabe.gesamt.value + "0";
	kommazahl = 0;
}