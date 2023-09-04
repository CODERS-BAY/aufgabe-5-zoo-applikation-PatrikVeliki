import {Card, CardMedia, CardContent, Typography} from '@mui/material';

const AnimalCard = ({animal, animalImages}) => (
    <Card>
        <CardMedia component="img" alt={animal.gattung} height="140" image={animalImages[animal.gattung]}/>
        <CardContent>
            <Typography variant="h6" gutterBottom>{animal.gattung}</Typography>
            <Typography variant="body2" color="textSecondary">
                Nahrung: {animal.nahrung}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Gehege: {animal.gehegeId}
            </Typography>
        </CardContent>
    </Card>
);

