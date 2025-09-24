import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Paper, Typography } from "@mui/material";
import { useMostPlayedGames } from "../../hooks/useMostPlayedGames.ts";
import { useTopPlayersPerGame } from "../../hooks/useTopPlayersPerGame.ts";
import { TopPlayer } from "../../model/TopPlayer.ts";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticsPage = () => {
    const {
        data: mostPlayedGames,
        isLoading: mostPlayedGamesLoading,
        isError: mostPlayedGamesError,
    } = useMostPlayedGames();

    const {
        data: topPlayersPerGame,
        isLoading: topPlayersPerGameLoading,
        isError: topPlayersPerGameError,
    } = useTopPlayersPerGame();

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 16,
                    },
                    color: "#333",
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 16,
                    },
                    color: "#333",
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                bodyFont: {
                    size: 14,
                },
                titleFont: {
                    size: 16,
                },
            },
        },
    };

    const chartData = mostPlayedGames
        ? {
            labels: mostPlayedGames.map((game) => game.gameName),
            datasets: [
                {
                    label: "Times Played",
                    data: mostPlayedGames.map((game) => game.timesPlayed),
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        }
        : { labels: [], datasets: [] };

    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "rgba(75, 192, 192, 0.2)",
                padding: 1,
                overflowY: "auto",
                paddingTop: { xs: "100px", sm: "120px", md: "140px" },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 2,
                    position: "relative",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    Analytics
                </Typography>
            </Box>

            {/* Charts Container */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    width: "100%",
                    justifyContent: "center",
                    gap: { xs: 4, sm: 6 },
                    paddingX: { xs: 2, sm: 3 },
                    marginTop: 3,
                }}
            >
                {/* Left Chart */}
                <Paper
                    elevation={3}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "40%",
                        },
                        height: "65vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        padding: 2,
                    }}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "1.8rem" },
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Top 5 Played Games
                    </Typography>

                    <Box sx={{ width: "100%", height: "100%" }}>
                        {mostPlayedGamesLoading ? (
                            <Typography
                                variant="body1"
                                sx={{ textAlign: "center" }}
                            >
                                Fetching data...
                            </Typography>
                        ) : mostPlayedGamesError ? (
                            <Typography
                                variant="body1"
                                color="error"
                                sx={{ textAlign: "center" }}
                            >
                                Error fetching data for the "Top 5 Played Games" chart.
                            </Typography>
                        ) : (
                            <Bar data={chartData} options={chartOptions} />
                        )}
                    </Box>
                </Paper>

                {/* Right Chart */}
                <Paper
                    elevation={3}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "40%",
                        },
                        height: "65vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        padding: 2,
                    }}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontSize: { xs: "1.8rem", sm: "1.8rem" },
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Top Players Per Game
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            maxHeight: "100%",
                            overflowY: "auto",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {topPlayersPerGameLoading ? (
                            <Typography
                                variant="body1"
                                sx={{ textAlign: "center" }}
                            >
                                Fetching data...
                            </Typography>
                        ) : topPlayersPerGameError ? (
                            <Typography
                                variant="body1"
                                color="error"
                                sx={{ textAlign: "center" }}
                            >
                                Error fetching data for the "Top Players Per Game" chart.
                            </Typography>
                        ) : (
                            topPlayersPerGame?.map((game, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        marginBottom: 3,
                                        padding: 2,
                                        borderBottom: "1px solid #ddd",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        textAlign: "center",
                                        width: "100%",
                                        maxWidth: "600px",
                                        marginX: "auto",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: "1.5rem",
                                            fontWeight: "bold",
                                            marginBottom: 2,
                                        }}
                                    >
                                        {game.game_name}
                                    </Typography>

                                    <ol
                                        style={{
                                            paddingLeft: 0,
                                            listStylePosition: "inside",
                                            fontSize: "1.1rem",
                                            lineHeight: "2rem",
                                            width: "100%",
                                            margin: 0,
                                        }}
                                    >
                                        {game.top_players.map(
                                            (player: TopPlayer, playerIndex) => (
                                                <li
                                                    key={playerIndex}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginBottom: "0.5rem",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginRight: "0.5rem",
                                                        }}
                                                    >
                                                        {playerIndex + 1}.
                                                    </span>
                                                    {player.player_name}
                                                </li>
                                            )
                                        )}
                                    </ol>
                                </Box>
                            ))
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default AnalyticsPage;
