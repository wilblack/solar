import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from "react";
import api from "../../api-service";
import bodyService from '../../services/body.service';
import { Body, BodyOption } from '../../types';


const Home: FC = () => {
    const [planets, setplanets] = useState<Body[]>()
    const [planetOptions, setPlanetOptions] = useState<BodyOption[]>([])
    
    useEffect(() => {
        const getData = async () => {
            let subscribe = true
            const results = await api.fetchPlanets([])
            const englishNames = await api.fetchEnglishNames()
            bodyService.buildDataframe()
            if (subscribe) {
                setplanets(results)
                const planetOptions: BodyOption[] = results.map((p, i) => { return { label: p.englishName, value: i } })
                setPlanetOptions(planetOptions)
            }
            subscribe = false
        }
        getData()
    }, [setplanets])


    
    
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    }
    
    return (
        <Container component="main" maxWidth="md">
            <Typography component="h1" variant="h5">
                Home    
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            disablePortal
                            id="planet-search"
                            options={planetOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Planet" />}
                            />
                    </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Search
                        </Button>
                </Grid>
            </Box>
        </Container>
    )
}

export default Home