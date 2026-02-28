'use client'

import { createClient } from "@/server/actions/client.action"
import { Client } from "@/types/client.types"
import { use, useEffect, useState } from "react"

interface Errors {
    name?: boolean
    email?: boolean
    emailExist?: boolean
}

export function ClientView() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState<Errors>({})

    async function sendForm() {
        const checkErrors: Errors = {}

        const cleanName = name.trim().replace(/\s+/g, ' ');
        const cleanEmail = email.trim().replace(/\s+/g, ' ');

        setName(cleanName);
        setEmail(cleanEmail);

        if (!cleanName) checkErrors.name = true;
        if (!cleanEmail) checkErrors.email = true;

        if (Object.keys(checkErrors).length > 0) {
            setErrors(checkErrors);
            return;
        }

        const data = {
            name: cleanName,
            email: cleanEmail
        } as Required<Client>

        const response = await createClient(data)

        console.log(response)

        if(!response.success) {
            console.log(22222)
            checkErrors.emailExist = true
            setErrors(checkErrors)
            return
        }

        setName('')
        setEmail('')

        setErrors({});
        console.log("Enviando:", cleanName, cleanEmail);
    }

    return (
        <main className="tudo">
            <div id="col1">
                <img src="/icone.png" alt="ícone de caminhão" />
                <h2 className="titulo">Encontre o veículo certo para você!</h2>
                <p className="texto">Preencha as informações abaixo</p>
                <form className="
                    pedido
                    [&_p]:mb-2
                    [&_p]:text-center
                    [&_p]:text-red-500
                ">
                    <label className="rotulo">Nome</label>
                    <p className={`${errors.name ? 'block' : 'hidden'}`}>campo obrigatório</p>
                    <input onChange={e => {setName(e.target.value); setErrors({...errors, name: false})}} value={name}
                        type="text" className={`campo-texto ${errors.name && 'ring-1 ring-red-500'}`} />

                    <label className="rotulo">E-mail</label>
                    <p className={`${errors.email ? 'block' : 'hidden'}`}>campo obrigatório</p>
                    <p className={`${errors.emailExist ? 'block' : 'hidden'}`}>E-Mail já existe</p>
                    <input onChange={e => {setEmail(e.target.value); setErrors({...errors, email: false, emailExist: false})}} value={email}
                        type="text" className={`campo-texto ${errors.email && 'ring-1 ring-red-500'}`} />

                    <label className="rotulo">Selecione o tipo de veículo</label>
                    <select onChange={e => setCategory(e.target.value)} value={category}
                        className="campo-texto">
                        <option>Básico</option>
                        <option>Família</option>
                        <option>Luxo</option>
                    </select>
                    <button onClick={sendForm} type="button" className="botao-reservar cursor-pointer">FAZER MINHA RESERVA</button>
                </form>
            </div>
            <div id="col2">
                <h1 className="oferta">VOCÊ PODE ALUGAR ESSE VEÍCULO POR R$ <strong className="destaque">99</strong> / DIA</h1>
                <p className="texto-oferta">Válido para todo território nacional</p>
                <img src="/renault-kwid.png" alt="Renault Kwid" />
            </div>
        </main>
    )
}