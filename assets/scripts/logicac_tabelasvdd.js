let f = "";
let txt = "";

const content = document.getElementById("content")

const inpf = document.getElementById("formula")

const btn_b = document.getElementById("back")
const btn_c = document.getElementById("clear")
const btn_g = document.getElementById("generate")

const btn_PP = document.getElementById("addPP")
const btn_SP = document.getElementById("addSP")
const btn_N = document.getElementById("addN")
const btn_E = document.getElementById("addE")
const btn_OUE = document.getElementById("addOUE")
const btn_OU = document.getElementById("addOU")
const btn_SE = document.getElementById("addSE")
const btn_SEE = document.getElementById("addSEE")

const btn_p = document.getElementById("addp")
const btn_q = document.getElementById("addq")
const btn_r = document.getElementById("addr")
const btn_s = document.getElementById("adds")

function transformF() {
    f = "";
    for (let i = 0; i < txt.length; i++) {
        l = txt[i]
        switch (l) {
            case "0":
                f+="¬"
                break;
            case "1":
                f+="^"
                break;
            case "2":
                f+="_"
                break;
            case "3":
                f+="V"
                break;
            case "4":
                f+=">"
                break;
            case "5":
                f+="<>"
                break;
            default:
                f+=l
                break;
        }
        
    }
}

function transform(txt) {
    let f = "";
    for (let i = 0; i < txt.length; i++) {
        l = txt[i]
        switch (l) {
            case "0":
                f+="¬"
                break;
            case "1":
                f+="^"
                break;
            case "2":
                f+="_"
                break;
            case "3":
                f+="V"
                break;
            case "4":
                f+=">"
                break;
            case "5":
                f+="<>"
                break;
            default:
                f+=l
                break;
        }
    }
    return f
}

function addToF(l) {
    txt+=l
    transformF()
    inpf.value = f 
}

function backspace() {
    txt = txt.substring(0,txt.length-1)
    transformF()
    inpf.value = f
}

function clear() {
    txt = ""
    transformF()
    inpf.value = f
}

function generate() {
    content.innerHTML=""
    const sandf = geraTabelaVErdade(txt)
    const s = sandf[0]
    const func = sandf[1]
    const keys = Object.keys(s)
    const tbl = document.createElement("table")

    tbl.classList.add("table")
    tbl.classList.add("text-center")
    tbl.classList.add("table-striped")
    tbl.classList.add("table-hover")

    const head = document.createElement("thead")
    head.classList.add("table-dark")
    head.classList.add("rounded-top")
    const trh = document.createElement("tr")
    const tbody = document.createElement("tbody")
    console.log(s)
    keys.forEach((k)=>{
        const th = document.createElement("th")
        const txt =  (func[k]==undefined)?"":(" ("+transform(func[k])+")")
        const title = document.createTextNode(k + txt)
        th.appendChild(title)
        trh.appendChild(th)
    })
    for (let i = 0; i < s[keys[0]].length; i++) {
       const tr = document.createElement("tr")
       keys.forEach((k)=>{
        const td = document.createElement("td")
        const text = document.createTextNode(s[k][i]?"V":"F")
        td.appendChild(text)
        tr.appendChild(td)
       })
       tbody.appendChild(tr)        
    }

    head.appendChild(trh)
    tbl.appendChild(head)
    tbl.appendChild(tbody)
    content.appendChild(tbl)
}

function defineButtons(){
    btn_c.onclick = ()=>{clear()}
    btn_b.onclick = ()=>{backspace()}
    btn_g.onclick = ()=>{generate()}
    
    btn_p.onclick = ()=>addToF("p")
    btn_q.onclick = ()=>addToF("q")
    btn_r.onclick = ()=>addToF("r")
    btn_s.onclick = ()=>addToF("s")

    btn_N.onclick = ()=>addToF(0)
    btn_E.onclick = ()=>addToF(1)
    btn_SE.onclick = ()=>addToF("4")
    btn_SEE.onclick = ()=>addToF("5")
    btn_OU.onclick = ()=>addToF("3")
    btn_OUE.onclick = ()=>addToF("2")
    btn_PP.onclick = ()=>addToF("(")
    btn_SP.onclick = ()=>addToF(")")
}

defineButtons()








function geraTabelaVErdade(txt) {
    const formules = {}
    //Lucas Gonçalves Silva
    let actualLetterAscii = 66
    let letters = txt
    /*
    * 0 - Não
    * 1 - E
    * 2 - Ou exclusivo
    * 3 - Ou
    * 4 - Se
    * 5 - Se e somente se
    */
    while (letters.includes('1')) {
        letters = letters.replace('1', '')
    }
    while (letters.includes('(')) {
        letters = letters.replace('(', '')
        letters = letters.replace(')', '')
    }
    while (letters.includes('0')) {
        letters = letters.replace('0', '')
    }
    while (letters.includes('2')) {
        letters = letters.replace('2', '')
    }
    while (letters.includes('3')) {
        letters = letters.replace('3', '')
    }
    while (letters.includes('4')) {
        letters = letters.replace('4', '')
    }
    while (letters.includes('5')) {
        letters = letters.replace('5', '')
    }

    const letras = []
    const simbols = {}

    while (letters.length > 0) {
        let s = letters.charAt(0)
        letras.push(s)
        simbols[s] = []
        while (letters.includes(s)) {
            letters = letters.replace(s, '')
        }
    }

    letters = letras.toString()
    while (letters.includes(",")) {
        letters = letters.replace(",", "")
    }
    const tam = letters.length

    const r = Math.pow(2, Object.keys(simbols).length)

    function genArr(r, n) {
        a = []
        c = 0
        v = true
        n = Math.pow(2, n - 1)
        for (let i = 0; i < r; i++) {
            if (c == n) {
                v = !v
                c = 0
            }
            a[i] = v ? true : false
            c++
        }
        return a
    }

    letras.forEach((l, i) => {
        simbols[l] = genArr(r, tam - (i))
    })

    function resolveOperations(f, o, txt) {
        let a = []
        switch (o) {
            case 0:
                for (let i = 0; i < r; i++) {
                    let p = simbols[f[1]][i]
                    a.push(!p)
                }
                break;
            case 1:
                for (let i = 0; i < r; i++) {
                    let p = simbols[f[0]][i]
                    let q = simbols[f[2]][i]
                    if (p && q) {
                        a.push(true)
                    }
                    else {
                        a.push(false)
                    }
                }
                break;
            case 2:
                for (let i = 0; i < r; i++) {
                    let p = simbols[f[0]][i]
                    let q = simbols[f[2]][i]
                    if (p != q) {
                        a.push(true)
                    }
                    else {
                        a.push(false)
                    }
                }
                break;
            case 3:
                for (let i = 0; i < r; i++) {
                    let p = simbols[f[0]][i]
                    let q = simbols[f[2]][i]
                    if (p || q) {
                        a.push(true)
                    }
                    else {
                        a.push(false)
                    }
                }
                break;
            case 4:
                for (let i = 0; i < r; i++) {
                    let p = simbols[f[0]][i]
                    let q = simbols[f[2]][i]
                    if (p == q) {
                        a.push(true)
                    }
                    else if (!p && q) {
                        a.push(true)
                    }
                    else {
                        a.push(false)
                    }
                }
                break;
            case 5:
                for (let i = 0; i < r; i++) {
                    let p = simbols[f[0]][i]
                    let q = simbols[f[2]][i]
                    if (p == q) {
                        a.push(true)
                    }
                    else {
                        a.push(false)
                    }
                }
                break;
        }
        simbols[String.fromCharCode(actualLetterAscii)] = a
        formules[String.fromCharCode(actualLetterAscii)] = f
        txt = txt.replace(f, String.fromCharCode(actualLetterAscii))
        actualLetterAscii++;
        return txt
    }

    function resolve(txt) {
        while (txt.length != 1) {
            if (txt.includes("0")) {
                let i = txt.indexOf("0")
                let f = txt[i] + txt[i + 1]
                txt = resolveOperations(f, 0, txt)
            }
            else if (txt.includes("1")) {
                let i = txt.indexOf("1")
                let f = txt[i - 1] + txt[i] + txt[i + 1]
                txt = resolveOperations(f, 1, txt)
            }
            else if (txt.includes("2")) {
                let i = txt.indexOf("2")
                let f = txt[i - 1] + txt[i] + txt[i + 1]
                txt = resolveOperations(f, 2, txt)
            }
            else if (txt.includes("3")) {
                let i = txt.indexOf("3")
                let f = txt[i - 1] + txt[i] + txt[i + 1]
                txt = resolveOperations(f, 3, txt)
            }
            else if (txt.includes("4")) {
                let i = txt.indexOf("4")
                let f = txt[i - 1] + txt[i] + txt[i + 1]
                txt = resolveOperations(f, 4, txt)
            }
            else if (txt.includes("5")) {
                let i = txt.indexOf("5")
                let f = txt[i - 1] + txt[i] + txt[i + 1]
                txt = resolveOperations(f, 5, txt)
            }
        }
        return txt
    }


    while (txt.includes("(")) {
        let end = txt.indexOf(")")
        let aux1 = txt.substring(0, end)
        let ini = aux1.lastIndexOf("(")
        aux1 = aux1.substring(ini + 1)
        let aux2 = resolve(aux1)

        txt = txt.substring(0, ini) + aux2 + txt.substring(end + 1)
    }

    txt = resolve(txt)
    formules.A = formules[String.fromCharCode(actualLetterAscii - 1)]
    simbols.A = simbols[String.fromCharCode(actualLetterAscii - 1)]

    delete formules[String.fromCharCode(actualLetterAscii - 1)]
    delete simbols[String.fromCharCode(actualLetterAscii - 1)]
    return [simbols, formules]
}
