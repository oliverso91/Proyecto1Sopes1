package main

import (

	"net/http"
	"io/ioutil"
	"strings"
	"fmt"
	"strconv"
	"encoding/json"
	"github.com/gorilla/mux"



)

type memStruct struct{
	TotalMemoria int
	MemoriaLibre int
}

type procesoStruct struct{
	PID string
	USUARIO string
	ESTADO string
	RAM string
	NOMBRE string
	PPID string
}


type subProcesoStruct struct{
	Proceso [] procesoStruct
}




func main () {



myRouter := mux.NewRouter().StrictSlash(true)
	//http.HandleFunc("/memoria", ramInfo)
	myRouter.HandleFunc("/proceso/{id}", returnSingleArticle)
	http.HandleFunc("/proceso", procesosInfo)

	http.ListenAndServe(":3000", nil)
	http.ListenAndServe(":10000", myRouter)

}

//////////////////////MEMORIA RAM
func ramInfo(w http.ResponseWriter, r *http.Request) {

	b, err := ioutil.ReadFile("/proc/meminfo")
	if err != nil {
		return
	}

	str := string(b)
	listadoInfo := strings.Split(string(str), "\n")

	memoriaTotal := strings.Replace((listadoInfo[0])[10:24], " ", "", -1 )
	memoriaLibre := strings.Replace((listadoInfo[1])[10:24], " ", "", -1 )
	ramTotalKB, err1 := strconv.Atoi(memoriaTotal)
	ramLibreKB, err2 := strconv.Atoi(memoriaLibre)
	if err1 == nil && err2 == nil{
			ramTotalMB := ramTotalKB / 1024
			ramLibreMB := ramLibreKB / 1024


			memResponse 			:= memStruct{ramTotalMB, ramLibreMB}

			jsonResponse, errorJson := json.Marshal(memResponse)
		//	fmt.Printf("enviar datos:  %s\n", jsonResponse)

			if errorJson != nil {

				http.Error(w, errorJson.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.WriteHeader(http.StatusOK)
			w.Write(jsonResponse)
	}else {

		return
	}


}


///////////////////Procesos
func procesosInfo(w http.ResponseWriter, r *http.Request) {

	b1,  errx := ioutil.ReadDir("/proc")
//	fmt.Printf("enviar datos:  %s\n", errx)
	if errx != nil {
		return
	}

//var jsonFin subProcesoStruct

var pid string
//var usuario string
var proceso [] procesoStruct
var procesoS string
var estado string
var memoriaUsada string
var procesoPadre string
//var memResponsex procesoStruct


//	str := string(b1)
//	listadoInfo := strings.Split(string(str), "\n")
/*
for _, f := range b1 {

	b, err := ioutil.ReadFile("/proc/" + f.Name() + "/status")
	if err != nil {
		return
	}

	str := string(b)
	listadoInfo := strings.Split(string(str), "\n")

	proceso = listadoInfo[0][6:]
fmt.Println("Made 10000 random strings like", proceso)
	}*/


	for i := 0; i < 235; i++ {

		b, err := ioutil.ReadFile("/proc/" + b1[i].Name() + "/status")
		if err != nil {
			return
		}

		bU, errU := ioutil.ReadFile("/proc/" + b1[i].Name() + "/loginuid")
		if errU != nil {
			return
		}

		str := string(b)
		strU := string(bU)

		listadoInfo := strings.Split(string(str), "\n")
		procesoS = listadoInfo[0][6:]
		estado = listadoInfo[2][10:len(listadoInfo[2])-1]
		memoriaUsada = listadoInfo[21][11:len(listadoInfo[21])-3]
		procesoPadre = listadoInfo[6][6:]
		//listadUser := strings.Split(string(listadoInfo[8]), "\n")

		pid = b1[i].Name()

		if memoriaUsada != "ffffffffff"{
			memResponsex := procesoStruct{pid, strU, estado, memoriaUsada, procesoS, procesoPadre}

			proceso = append(proceso, memResponsex)
			fmt.Println("Made 10000 random strings like", strU)
		}

	}



	//jsonFinal := procesoStruct{memResponsex}
//listadoInfo := strings.Split(string(proceso), "\n")
//	json.NewEncoder(w).Encode(jsonFin)
	json.NewEncoder(w).Encode(proceso)
//	fmt.Println("json:", proceso)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

}


func returnSingleArticle(w http.ResponseWriter, r *http.Request){
    vars := mux.Vars(r)
    key := vars["id"]

    fmt.Fprintf(w, "Key: " + key)
}
