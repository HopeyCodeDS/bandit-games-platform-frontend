import {
    Box,
    Button,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import { useState, useEffect } from 'react';
import StatisticsTable from './StatisticsTable.tsx';
import { downloadCSV } from '../../utils/csvUtils.ts';
import { PlayerGameStatistic } from '../../model/PlayerGameStatistic.ts';
import StatisticsLoadingData from './StatisticsLoadingData.tsx';
import { useGameNames } from '../../hooks/useGameNames.ts';
import { useStatisticsByGameName } from '../../hooks/useGetStatisticsByGameName.ts';
import { useStatisticsByPlayerName } from '../../hooks/useGetStatisticsByPlayerName.ts';
import { useStatistics } from '../../hooks/useGetStatistics.ts';

const StatisticsPage = () => {
    const [filter, setFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [statisticsToShow, setStatisticsToShow] = useState<PlayerGameStatistic[] | undefined>(undefined);
    const [filterByGameName, setFilterByGameName] = useState(false);
    const [filterByPlayerName, setFilterByPlayerName] = useState(false);
    const filterGameNameText = 'gameName';
    const filterPlayerNameText = 'playerName';
    const { data: gameNames } = useGameNames();
    const { isLoading, data, isError } = useStatistics(filter);
    const { isLoading: statisticsByGameNameLoading, data: statisticsByGameName, isError: statisticsByGameNameError } = useStatisticsByGameName(filterValue, filterByGameName);
    const { isLoading: statisticsByPlayerNameLoading, data: statisticsByPlayerName, isError: statisticsByPlayerNameError } = useStatisticsByPlayerName(filterValue, filterByPlayerName);

    useEffect(() => {
        if (!filter) {
            setStatisticsToShow(data);
        }
    }, [data, filter]);

    useEffect(() => {
        if (filterByGameName && filterValue) {
            setStatisticsToShow(statisticsByGameName);
        } else if (filterByPlayerName && filterValue) {
            setStatisticsToShow(statisticsByPlayerName);
        }
    }, [filterByGameName, filterByPlayerName, filterValue, statisticsByGameName, statisticsByPlayerName]);

    useEffect(() => {
        setFilterByPlayerName(false);
        setFilterByGameName(false);
    }, [filterValue]);

    const handleDownload = () => {
        if (statisticsToShow) {
            downloadCSV(statisticsToShow, filterValue + ' analytics-data.csv');
        }
    };

    const handleApplyFilter = () => {
        switch (filter) {
            case filterGameNameText:
                setFilterByGameName(true);
                setFilterByPlayerName(false);
                break;
            case filterPlayerNameText:
                setFilterByPlayerName(true);
                setFilterByGameName(false);
                break;
            default:
                console.error('Unknown filter type');
        }
    };

    const handleFilterChange = (filterType: string) => {
        setFilter(filterType);

        if(filterType === filterGameNameText){
            setFilterValue("BattleShip")
        }
        else {
            setFilterValue('');
        }

        console.log("Filter Value Updated:", filterValue); // Check the filter value
    };

    const handleHideFilterChange = () => {
        setFilter('');
        setFilterValue('');
        setFilterByGameName(false);
        setFilterByPlayerName(false);
        setStatisticsToShow(data);
    };

    if (isLoading || statisticsByGameNameLoading || statisticsByPlayerNameLoading) {
        return <StatisticsLoadingData message="Loading data" />;
    }


    if (isError || statisticsByGameNameError || statisticsByPlayerNameError) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Ensures elements are stacked vertically
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    top: 0,
                    left: 0,
                    padding: 2, // Optional: Add some padding to prevent content from touching edges
                }}
            >
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    An error occurred while fetching statistics.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ marginTop: 3 }} // Adds some margin between the error message and button
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100vw',
                height: '100vh',
                padding: 0,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    marginTop: 16,
                }}
            >
                Filter By
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                    marginTop: 3,
                }}
            >
                <Button variant="contained" onClick={() => handleFilterChange(filterGameNameText)}>
                    Game Name
                </Button>
                <Button variant="contained" onClick={() => handleFilterChange(filterPlayerNameText)}>
                    Player Name
                </Button>
                <Button variant="contained" onClick={handleDownload}>
                    Download CSV
                </Button>
            </Box>

            {filter && (
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{`Filtering by ${filter}`}</Typography>
                    {filter === filterGameNameText ? (
                        <FormControl
                            variant="outlined"
                            sx={{
                                width: 150,
                                marginTop: 2,
                                backgroundColor: 'white', // White background
                                '& .MuiInputLabel-root': {
                                    color: 'black', // Label color
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white', // Hide the border
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white', // Hide border on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white', // Hide border when focused
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black', // Text color inside the input
                                    textAlign: 'center', // Center the text
                                },
                            }}
                        >
                            <Select
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                label="Game Name"
                            >
                                {gameNames?.map((gameName) => (
                                    <MenuItem key={gameName} value={gameName}>
                                        {gameName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <TextField
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            fullWidth
                            sx={{
                                marginTop: 2,
                                backgroundColor: 'white',
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                    transition: 'all 0.3s ease',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'black',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    textAlign: 'center',
                                },
                            }}
                        />
                    )}

                    <Box sx={{ marginTop: 3 }}>
                        <Button variant="contained" onClick={handleApplyFilter}>
                            Apply Filter
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: 2 }}
                            onClick={handleHideFilterChange}
                        >
                            Hide Filter
                        </Button>
                    </Box>
                </Box>
            )}

            <Typography variant="h4" sx={{ marginTop: 8 }}>
                Statistics
            </Typography>
            <StatisticsTable data={statisticsToShow} />
        </Box>
    );
};

export default StatisticsPage;
