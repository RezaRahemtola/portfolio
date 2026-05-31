interface ChessStats {
	chess_rapid?: {
		last: { rating: number };
		best?: { rating: number };
	};
	chess_blitz?: {
		last: { rating: number };
		best?: { rating: number };
	};
}

export async function getChessStats(): Promise<number | null> {
	try {
		const response = await fetch("https://api.chess.com/pub/player/rezarahemtola/stats", {
			next: { revalidate: 3600 }, // Cache for 1 hour
			signal: AbortSignal.timeout(5000), // Don't let a hung upstream block the homepage render
		});

		if (!response.ok) {
			throw new Error("Failed to fetch chess stats");
		}

		const data: ChessStats = await response.json();

		const rapidRating = data.chess_rapid?.best?.rating || data.chess_rapid?.last?.rating;
		const blitzRating = data.chess_blitz?.best?.rating || data.chess_blitz?.last?.rating;

		const ratings = [rapidRating, blitzRating].filter((rating): rating is number => rating !== undefined);
		const highest = ratings.length > 0 ? Math.max(...ratings) : null;

		return highest;
	} catch (error) {
		console.error("Error fetching chess stats:", error);
		return null;
	}
}
