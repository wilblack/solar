import { createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/private-theming';
import { FC, useEffect, useState } from "react";
import api from "../../services/api-service";
import bodyService from '../../services/body.service';
import { Body, BodyOption, PlanetFormData } from '../../types';

const theme = createTheme()

const Home: FC = () => {
    const [planets, setplanets] = useState<Body[]>()
    const [planetOptions, setPlanetOptions] = useState<BodyOption[]>([])
    const [closestMatch, setClosestMatch] = useState<Body | null>(null)
    
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

    const samplePlanet: PlanetFormData = {
        "englishName": "Plut",
        "moons": ["Europa", "Io"],
        "perihelion": 0,
        "aphelion": 0,
        "mass": 0,
        "density": 0,
        "gravity": 0,
        "escape": 0,
        "meanRadius": 0,
        "discoveredBy": ["ombaugh"],
        "discoveryDate": new Date(2030, 1, 30)
        }
    
    
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        debugger
        console.log(data)
        const closestPlanet = await bodyService.findClosestObject(samplePlanet)
        setClosestMatch(closestPlanet)
    }
    
    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
            <Typography component="h1" variant="h5">
                Find Closest Planet    
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="englishName"
                            fullWidth
                            id="englishName"
                            label="English Name"
                        />
                        <TextField
                            fullWidth
                            id="moons"
                            label="Moons (commas separated)"
                            name="moons"
                        />
                        <TextField
                            fullWidth
                            id="perihelion"
                            label="Perihelion"
                            name="perihelion"
                        />
                        <TextField
                            fullWidth
                            id="apelion"
                            label="Apelion"
                            name="apelion"
                        />
                        <TextField
                            fullWidth
                            id="mass"
                            label="Mass (kg)"
                            name="mass"
                        />
                        <TextField
                            fullWidth
                            id="density"
                            label="Density (kg/m^3)"
                            name="density"
                        />
                        <TextField
                            fullWidth
                            id="gravity"
                            label="Gravity"
                            name="gravity"
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
                    <Grid item xs={12} sm={6}>
                        {JSON.stringify(closestMatch)}
                    </Grid>
                </Grid>
            </Box>

            </Container>
        </ThemeProvider>
    )
}

export default Home