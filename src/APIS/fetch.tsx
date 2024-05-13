import { iInstrumento } from "../types/iInstrumento";

export const fetchAllData = async () => {
    const response = await fetch("http://localhost:8080/instrumentos/all");
    const data = await response.json();
    return data;
}

export const fetchIdData = async (id: number) => {
    const response = await fetch(`http://localhost:8080/instrumentos/${id}`)
    const data = await response.json();
    return data;
}

export const postInstrumento = async (instrumento: iInstrumento) => {
    const response = await fetch('http://localhost:8080/instrumentos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export const getCategorias = async () => {
    const response = await fetch("http://localhost:8080/categoria");
    const data = await response.json();
    return data;
}

export const putInstrumento = async (instrumento: iInstrumento) => {
    const response = await fetch('http://localhost:8080/instrumentos/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export const deleteInstrumento = async (instrumento: iInstrumento) => {
    const response = await fetch('http://localhost:8080/instrumentos/delete', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instrumento)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}