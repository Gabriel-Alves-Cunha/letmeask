import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

import illustrationSvg from "../assets/illustration.svg";
import logoSvg from "../assets/logo.svg";

import "../styles/auth.scss";

export function NewRoom() {
	const history = useHistory();
	const { user } = useAuth();

	const [newRoom, setNewRoom] = useState("");

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === "") return;
		if (!user) throw new Error("You are not logged in!");

		const roomRef = database.ref("rooms");
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationSvg}
					alt="Ilustração simbolizando perguntas e respostas"
				/>

				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire dúvidas da sua audiência em tempo real</p>
			</aside>

			<main>
				<div className="main-content">
					<img src={logoSvg} alt="Letmeask logo" />
					<h2>Criar uma sala</h2>

					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={(e) => setNewRoom(e.target.value)}
							value={newRoom}
						/>

						<Button type="submit">Entrar na sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
