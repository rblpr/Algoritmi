const algomap = {
    astar: {
        title: "A* Pathfinding",
        desc: `A* è uno dei più famosi algoritmi di ricerca del percorso
            migliore, in grado di aggirare ostacoli per raggiungere un
            obiettivo preposto. <br>
            Questo algoritmo è detto <i>euristico</i>, in quanto valuta
            ogni casella visitata e la classifica sulla base della
            distanza "in linea d'aria" dall'obiettivo. In questo modo è
            capace di individuare la sequenza di passi più conveniente
            per raggiungere l'obiettivo. <br>
            In questa demo puoi disegnare ostacoli nel percorso
            cliccando il tasto <b>DISEGNA</b> e usando il mouse come
            matita. Per ricominciare da capo puoi premere il tasto
            <b>CANCELLA TUTTO</b>.`,
        shortdesc: "Algoritmo di ricerca del percorso migliore",
        additional: `<button id="btnStart" onclick = "AStar()" class="btn btn-primary">inizia</button>
            <button id="btnDis" onclick = "cambioMatita()" class="btn btn-primary">disegna</button>
            <button id="btnrestart" onclick = "restart()" class="btn btn-primary">Cancella tutto</button>`,
        tags: ["ASD"],
    },

    maze: {
        title: "Maze Generator",
        desc: `Questo algoritmo è una versione randomizzata dell'algoritmo
            di <b>ricerca in profondità</b>. Spesso implementato con uno
            <i>stack</i>, questo approccio è uno dei modi più semplici
            per generare un labirinto utilizzando un computer.
            <br>Considera lo spazio per un labirinto come una grande
            griglia di celle (come una grande scacchiera) e ogni cella
            inizia con quattro pareti. A partire dalla prima cella, il
            computer seleziona una cella adiacente casuale che non è
            stata ancora visitata. Il computer rimuove il muro tra le
            due celle e contrassegna la nuova cella come visitata, e la
            aggiunge allo stack per permettere il <b>backtracking</b>.
            Il computer continua questo processo in modo ricorsivo, e
            quando incontra una cella che non ha vicini non visitati la
            considera un vicolo cieco. Quando si trova in un vicolo
            cieco, fa un passo indietro (in questo consiste il
            backtracking) attraverso il percorso fino a raggiungere una
            cella con un vicino non visitato, continuando la generazione
            del percorso visitando questa nuova cella non visitata
            (creando un nuovo incrocio). Questo processo continua fino a
            quando ogni cella è stata visitata, facendo tornare indietro
            il computer fino alla cella iniziale. Come indicato sopra,
            questo algoritmo comporta una ricorsione profonda che può
            causare problemi di overflow dello stack su alcune
            architetture di computer.`,
        shortdesc: "Algoritmo per la creazione di un labirinto completo",
        additional: ``,
        tags: ["generative art", "ASD"],
    },

    tris: {
        title: "Tris AI Minimax",
        desc: `
            Il minimax, nella <i>teoria delle decisioni</i>, è un metodo
            per minimizzare la massima (<b>minimax</b>) perdita
            possibile.<br>L'algoritmo minimax è un
            <b>algoritmo ricorsivo</b> per la ricerca della mossa
            migliore in una determinata situazione. L'algoritmo minimax
            è costituito da una funzione di valutazione posizionale che
            misura la bontà di una posizione (o stato del gioco) e
            indica quanto è desiderabile per il dato giocatore
            raggiungere quella posizione; il giocatore fa poi la mossa
            che minimizza il valore della migliore posizione
            raggiungibile dall'altro giocatore. Quindi l'algoritmo
            minimax assegna un valore ad ogni mossa legale,
            proporzionale a quanto essa diminuisce il valore della
            posizione per l'altro giocatore.<br>Questo presuppone che
            sia possibile per chi computa (non parliamo ancora di
            applicazioni al calcolatore) valutare tutto l'albero delle
            mosse possibili del gioco; in realtà questo si può fare solo
            per giochi molto semplici, mentre per altri, come gli
            scacchi o il go questo non è possibile o lo è solo nelle
            fasi finali, e in generale si può solo calcolare una stima
            della probabilità che una data mossa porti alla vittoria di
            uno dei giocatori.`,
        shortdesc: "Intelligenza artificiale capace di giocare partite di tris",
        additional: `<button id="btnrestart" onclick = "location.reload()" class="btn btn-primary">Rigioca!</button>`,
        tags: ["AI", "ASD"],
    },

    rockets: {
        title: "Smart Rockets",
        desc: `
        Questo è un <b>algoritmo genetico</b>: vengono simulate le
        leggi della selezione naturale su una popolazione di
        individui, in questo caso razzi che devono raggiungere
        l'obiettivo rosso oltre l'ostacolo.<br>
        Alla fine di ogni generazione, per ciascun individuo viene
        calcolata la fitness dei suoi geni in base a quanto si è
        avvicinato all'obiettivo. Nella creazione della generazione
        successiva (fase di riproduzione) viene costruito un pool
        genetico da cui estrarre i geni per il DNA degli individui
        della nuova generazione; gli indivudui con fitness maggiore
        contribuiscono maggiormente al pool genetico, in questo modo
        i solo i geni migliori vengono passati alla generazione
        successiva. <br>
        Entrano in gioco anche simulazioni di
        <b>meccanismi biologici</b>, come il crossover e la
        mutazione.
            `,
        shortdesc: "Algoritmo genetico applicato al superamento di un ostacolo",
        additional: ``,
        tags: ["algoritmi genetici"],
    },

    fractal: {
        title: "Fractal Tree",
        desc: `
        Un frattale è un oggetto geometrico dotato di
        <b>omotetia interna</b>: si ripete nella sua forma allo
        stesso modo su scale diverse, e dunque ingrandendo una
        qualunque sua parte si ottiene una figura simile
        all'originale.<br>
        Questo semplice <b>algoritmo ricorsivo</b> costruisce un
        frattale a forma di albero. Da ogni segmento partono altri
        due segmenti lunghi la metà, con una inclinazione fissa. In
        questo modo ogni ramo è una figura simile all'albero
        completo. <br>
        In questa demo puoi modificare il valore dell'angolo di
        inclinazione tra i rami utilizzando lo slider in alto.
            `,
        shortdesc: "Frattali che prendono la forma di alberi",
        additional: `<label for="">Angolo tra i rami</label>
		<input type="range" value="0.785" max="6.28" step="0.0628" min="0" onchange='restart()' />`,
        tags: ["ricorsione"],
    },

    insertion: {
        title: "Insertion Sort",
        desc: `
        L'Insertion sort, in italiano ordinamento a inserimento, è
        un algoritmo relativamente semplice per ordinare un array.
        Non è molto diverso dal modo in cui un essere umano, spesso,
        ordina un mazzo di carte.<br>
        Esso è un <b>algoritmo in place</b>, cioè ordina l'array
        senza doverne creare una copia, risparmiando memoria. Pur
        essendo molto meno efficiente di algoritmi più avanzati, può
        avere alcuni vantaggi: ad esempio, è semplice da
        implementare ed è efficiente per insiemi di partenza che
        sono quasi ordinati.<br>
        In ogni iterazione, viene rimosso un elemento dalla
        sottosequenza non ordinata (scelto, in generale,
        arbitrariamente) e inserito (da cui il nome dell'algoritmo)
        nella posizione corretta della sottosequenza ordinata,
        estendendola così di un elemento.
            `,
        shortdesc: "Algoritmo di ordinamento",
        additional: `<div>
        <input
            type="number"
            value="20"
            onchange="reset()"
            onsubmit="start()"
        />

        <button onclick="start()" class="btn btn-primary">Ordina</button>
    </div>`,
        tags: ["algoritmi di ordinamento"],
    },

    bubble: {
        title: "Bubble Sort",
        desc: `
        Il bubble sort è un <b>algoritmo iterativo</b>, ossia basato
        sulla ripetizione di un procedimento fondamentale. La
        singola iterazione dell'algoritmo prevede che gli elementi
        dell'array siano confrontati a due a due, procedendo in un
        verso stabilito. Ad ogni confronto, se i due elementi
        confrontati non sono ordinati secondo il criterio prescelto,
        vengono scambiati di posizione. Durante ogni iterazione
        almeno un valore viene spostato rapidamente fino a
        raggiungere la sua collocazione definitiva; in particolare,
        alla prima iterazione il numero più grande raggiunge
        l'ultima posizione dell'array, alla seconda il secondo
        numero più grande raggiunge la penultima posizione, e così
        via. `,
        shortdesc: "Algoritmo di ordinamento",
        additional: `<div>
        <input
            type="number"
            value="20"
            onchange="reset()"
            onsubmit="start()"
        />

        <button onclick="start()" class="btn btn-primary">Ordina</button>
    </div>`,
        tags: ["algoritmi di ordinamento"],
    },

    gol: {
        title: "Game of Life",
        desc: `
        <i>Il Gioco della vita</i>
        è un automa cellulare sviluppato dal matematico inglese John Conway 
        sul finire degli anni sessanta. 
        È interessante per scienziati, matematici e economisti osservare 
        il modo in cui <b>schemi complessi</b> possono emergere dall'implementazione di regole assai semplici.
        Si tratta in realtà di un gioco senza giocatori, intendendo che la sua evoluzione è determinata 
        dal suo stato iniziale, senza necessità di alcun input da parte di giocatori umani.</br>
        Tutte le celle del mondo vengono aggiornate simultaneamente nel passaggio da un istante a 
        quello successivo, seguendo quattro semplici <b>regole</b>:
        <ul>
        <li>Qualsiasi cella viva con meno di due celle vive adiacenti muore, come per effetto d'isolamento;
        <li>Qualsiasi cella viva con due o tre celle vive adiacenti sopravvive alla generazione successiva;
        <li>Qualsiasi cella viva con più di tre celle vive adiacenti muore, come per effetto di sovrappopolazione;
        <li>Qualsiasi cella morta con esattamente tre celle vive adiacenti diventa una cella viva, come per effetto di riproduzione.
        </ul>
        
        Il Gioco della vita è potente quanto un qualunque computer con memoria infinita: è <b>Turing equivalente</b>.</br></br>
        In questa demo puoi disegnare una configurazione iniziale premendo le caselle della griglia per renderle vive, oppure puoi 
        generare una configurazione casuale premendo il bottone <i>Random</i>.`,
        shortdesc: "Automa cellulare",
        additional: `<button onclick="start()" class="btn btn-primary">Iniza!</button>
        <button onclick="fillRandom()" class="btn btn-primary">Random</button>
        <button onclick="restart()" class="btn btn-primary">Nuovo</button>
        `,
        tags: ["automi cellulari"],
    },

    noisefield: {
        title: "Perlin Noise Flow Field",
        desc: `
            Il <b>rumore di Perlin</b> è una tecnica utilizzata per generare valori casuali che variano <b>gradualmente</b>, cioè 
            input simili restituiscono valori di rumore simili.</br>
            Ken Perlin ha sviluppato questo algoritmo per ovviare al poco realismo delle immagini digitali che all'epoca 
            era possibile generare. Infatti il rumore di Perlin viene utilizzato per generare immagini di terreni, materiali organici
            e texture <b>molto realistici</b>.</br></br>
            In questa demo si usa il rumore di Perlin per creare un campo di forze che agiscono su delle particelle, 
            spostandole nella direzione determinata dal rumore. Questo permette di simulare realisticamente, per esempio, particelle di fumo
            spostate dal <b>vento</b>.</br> Visualizzando il campo, si nota chiaramente come i valori del rumore (che corrispondono
            all'inclinazione delle piccole linee) variano gradualmente nel piano.


        `,
        shortdesc: "Si utilizza il rumore di Perlin per simulare un campo in grado di muovere delle particelle",
        additional: `<button onclick="showField()" class="btn btn-primary">Mostra campo</button>`,
        tags: ["algoritmi di rumore", "generative art"],
    },

    monkey: {
        title: "Shakespeare's Monkey",
        desc: `
        Questo è un <b>algoritmo genetico</b>, ossia un algoritmo
        che simula leggi e processi biologici tipici della selezione
        naturale. <br>
        Questa semplice demo è un'applicazione del
        <b>teorema della scimmia instancabile</b>, che afferma che
        uno scimpanzè, premendo i tasti della tastiera per un tempo
        sufficientemente lungo, arriverà quasi sicuramente a
        comporre qualsiasi opera mai scritta. <br>
        Questo algoritmo assegna ad ogni frase generata casualmente
        una <b>fitness</b> proporzionale al numero di caratteri
        esatti nella posizione giusta. Frasi con una fitness più
        alta hanna maggiore probabilità di passare i loro geni (le
        lettere che le compongono) alla generazione successiva,
        alzando la probabilità di ottenere una frase che corrisponda
        alla frase target.
        `,
        shortdesc: 'Simulazione di una "popolazione" di frasi, che evolvono verso un obiettivo',
        additional: `<input
        type="text"
        maxlength="30"
        value="essere o non essere"
        onchange="restart()"
    />
    <div id="canvasHolder"></div>`,
        tags: ["algoritmi genetici"],
    },
    marching: {
        title: "Marching Squares",
        desc: `
        Da un campo bidimensionale di valori numerici (rappresentati dai
        punti grigi), si ottiene un'immagine binaria applicando una soglia: 
        i valori numerici maggiori della soglia diventano 1, 
        quelli minori della soglia diventano 0.
        </br></br>
        Ogni quadrato 2x2 di punti costituisce una cella nella griglia. Per ogni cella
        vengono presi i quattro valori negli angoli e usati come bit di un numero binario. 
        Ottenuto il numero, si usa una <b>lookup table</b> per disegnare la 
        linea corretta.</br></br>
        Le tipiche applicazioni di questo algoritmo includono la generazione
        dei contorno nelle mappe topologiche e nelle mappe metereologiche.
        </br></br>
        In questa demo puoi visualizzare i valori del campo come punti colorati, come i veri
        valori numerici o come immagine binaria.
        `,
        shortdesc: 'Algoritmo di computer grafica per generare linee di contorno',
        additional: `<button class="btn btn-primary" onclick="changeMode()">Cambia vista</button>`,
        tags: ["ASD"],
    },
    worley: {
        title: "Worley Noise",
        desc: `Il rumore di Worley è una funzione di rumore utilizzata per 
        generare <b>texture procedurali</b>, in particolare per simulare acqua, cellule o rocce.
        </br></br>
        L'algoritmo consiste nel prendere un insieme casuale di punti e per ogni pixel dell'immagine calcolare la sua distanza da ciascun punto dell'insieme preso.
        Il colore del pixel viene poi definito dalla sua <b>distanza dall'n-esimo punto più vicino</b>,
         dove n è l'ordine della funzione di rumore.</br></br>
        La funzione di ordine 1 corrisponde alla <b>tassellatura di Voronoi</b>.
        </br></br>
        In questa demo puoi cambiare l'ordine del rumore e vedere come la texture generata cambia, pur mantenendo lo stesso insieme di punti.`,
        shortdesc: 'Algoritmo di rumore cellulare',
        additional: `<div class="d-flex align-items-baseline">
        <button class="btn btn-primary" onclick="changeOrder(-1)">-</button><p id="ordine" class="mx-2">1</p><button class="btn btn-primary" onclick="changeOrder(1)">+</button>
        </div>`,
        tags: ["algoritmi di rumore"],
    },
    binsearch: {
        title: "Binary Search",
        desc: `
        La ricerca dicotomica è un algoritmo di ricerca di un elemento in una lista ordinata.
        </br></br>
        Si inizia prendendo l'elemento centrale. Se l'obiettivo è minore dell'elemento considerato,
        si scartano tutti gli elementi successivi e si prende l'elemento centrale del sottoinsieme rimanente.
        Se invece l'obiettivo è maggiore dell'elemento considerato,
        si scartano tutti gli elementi precedenti.
        Si continua così finchè non si trova l'elemento ricercato.
        </br></br>
        Con questo metodo il numero di tentativi si abbassa da un massimo
        di n (con n il numero di elementi tra cui cercare) ad un massimo di 
        <b>logaritmo in base 2 di n</b>.
        `,
        shortdesc: 'Algoritmo di ricerca molto efficiente per liste ordinate',
        additional: ``,
        tags: ["algoritmi di ricerca"],
    },

    giftwrap: {
        title: "Gift Wrapping",
        desc: `
        Questo algoritmo, conosciuto anche come marcia di Jarvis,
        permette di trovare l'<b>inviluppo convesso</b> di un'insieme 
        di punti.
        </br></br>
        Intuitivamente, l'inviluppo convesso di un insieme di punti è
        la forma che assumerebbe un elastico allargato in modo da 
        contenere tutti i punti e poi lasciato libero di restringersi: 
        un poligono che ha alcuni di quei punti come vertici e li contiene tutti.
        </br></br>
        L'algoritmo inizia prendendo il punto più a sinistra di tutto l'insieme
        e come punto successivo viene scelto il punto tale che tutti 
        gli altri punti stiano a destra della congiungente tra il primo e il secondo punto. 
        `,
        shortdesc: "Algoritmo per trovare l'inviluppo complesso di un insieme di punti",
        additional: "",
        tags: ["geometria computazionale"],
    },

    quick: {
        title: "Quick Sort",
        desc: "",
        shortdesc: "Algoritmo di ordinamento",
        additional: "",
        tags: ["algoritmi di ordinamento"],
    },
}