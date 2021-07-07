import copySvg from "../assets/copy.svg";

import "../styles/room-code.scss";

type Props = {
	code: string;
};

export function RoomCode({ code }: Props) {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code);
	}

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copySvg} alt="Copiar código da sala" />
			</div>

			<span>Sala #{code}</span>
		</button>
	);
}
