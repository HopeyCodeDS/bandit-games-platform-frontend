import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { PlayerGameStatistic } from "../../model/PlayerGameStatistic.ts";

interface StatisticsTableProps {
    data: PlayerGameStatistic[] | undefined;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ data }) => {

    return (
        <TableContainer component={Paper} sx={{ width: "80%", marginTop:4}}>
            <Table sx={{ minWidth: 650 }} aria-label="analytics data table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{textAlign:"center"}}>Player Name</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Game Name</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Total Games Played</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Wins</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Loses</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Win/Lose Ratio</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Total Time Played</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Total Number of Moves</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Age</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Gender</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{textAlign:"center"}}>{row.player_name}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.game_name}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.total_games_played}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.total_wins}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.total_losses}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.total_moves}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.total_time_played_minutes}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.win_ratio.toFixed(2)}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.age}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.gender}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{row.country}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StatisticsTable;
