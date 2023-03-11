export default {
    Currendate: () => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear().toString();
        return (`${anio}-${mes}-${dia}`)
    },
    CurrendateDay: (dia) => {
        const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sábado"];
        const hoy = new Date().getDay();
        const ayer = new Date().getDay() - 1;
        const manana = new Date().getDay() + 1;

        if (dia === "ayer") {
            return diasSemana[ayer];
        } else if (dia === "manana") {
            return diasSemana[manana];
        } else {
            return diasSemana[hoy];
        }
    },
    DatePastPresent: (FechaInicial) => {
        const fechaInicio = new Date(FechaInicial); // fecha de inicio
        const fechaActual = new Date(); // fecha actual
        const diferencia = fechaActual.getTime() - fechaInicio.getTime(); // diferencia en milisegundos
        const diasPasados = Math.floor(diferencia / (1000 * 60 * 60 * 24)); // convertir milisegundos a días
        return diasPasados;
    }
};

// export default { currendate };