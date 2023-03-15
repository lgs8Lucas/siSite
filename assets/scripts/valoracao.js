var txt = "(p10q)"
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
{
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
}

const tam = letters.length
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
    txt = txt.replace(f, String.fromCharCode(actualLetterAscii))
    actualLetterAscii++;
    return txt
}

function resolve(txt) {
    while(txt.length != 1){
        if (txt.includes("0")) {
            let i = txt.indexOf("0")
            let f = txt[i]+ txt[i+1]
            txt = resolveOperations(f,0, txt)
        }
        else if (txt.includes("1")) {
            let i = txt.indexOf("1")
            let f = txt[i-1]+txt[i]+txt[i+1]
            txt = resolveOperations(f,1, txt)
        }
        else if (txt.includes("2")) {
            let i = txt.indexOf("2")
            let f = txt[i-1]+txt[i]+txt[i+1]
            txt = resolveOperations(f,2, txt)
        }
        else if (txt.includes("3")) {
            let i = txt.indexOf("3")
            let f = txt[i-1]+txt[i]+txt[i+1]
            txt = resolveOperations(f,3, txt)
        }
        else if (txt.includes("4")) {
            let i = txt.indexOf("4")
            let f = txt[i-1]+txt[i]+txt[i+1]
            txt = resolveOperations(f,4, txt)
        }
        else if (txt.includes("5")) {
            let i = txt.indexOf("5")
            let f = txt[i-1]+txt[i]+txt[i+1]
            txt = resolveOperations(f,5, txt)
        }
    }
    return txt
}

while(txt.includes("(")){
    let aux1 = txt.substring(txt.indexOf("(")+1, txt.indexOf(")"))
    let aux2 = resolve(aux1)
    txt = aux2+txt.substring(txt.indexOf(")")+1)
    break;
}

txt = resolve(txt)

simbols.A = simbols[String.fromCharCode(actualLetterAscii-1)]
delete simbols.C

console.log(simbols.A)