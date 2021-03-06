import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";

import illustrationSvg from "../assets/illustration.svg";
import googleIconSvg from "../assets/google-icon.svg";
import logoSvg from "../assets/logo.svg";

import "../styles/auth.scss";

export function Home() {
	const { user, signInWithGoogle } = useAuth();
	const history = useHistory();

	const [roomCode, setRoomCode] = useState("");

	async function handleCreateRoom() {
		if (!user) await signInWithGoogle();

		history.push("/rooms/new");
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === "") return;

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert("Room does not exists.");
			return;
		}

		if (roomRef.val().endedAt) {
			alert("Room already closed.");
			return;
		}

		history.push(`/rooms/${roomCode}`);
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

					<button className="create-room" onClick={handleCreateRoom}>
						<img src={googleIconSvg} alt="Logo da Google" />
						Crie sua sala com a Google
					</button>

					<div className="separator">ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							onChange={(e) => setRoomCode(e.target.value)}
							value={roomCode}
						/>

						<Button type="submit">Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
