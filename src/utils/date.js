export default {
    Currendate: () => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear().toString();
        return (`${anio}-${mes}-${dia}`)
    },
    CurrendateDay: () => {
        const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        const hoy = new Date().getDay();
        return diasSemana[hoy];
    }
};

// export default { currendate };