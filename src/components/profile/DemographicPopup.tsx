import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import {countries} from "../../model/Countries";
import {useUpdateDemographics} from "../../hooks/useUserProfile";

interface DemographicPopupProps {
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
    userData: {
        firstName: string;
        lastName: string;
        birthDate: string;
        gender: string;
        country: string;
        userId: string;
    };
    isProfileComplete: boolean;
}

const DemographicPopup: React.FC<DemographicPopupProps> = ({
                                                               isFormOpen,
                                                               setIsFormOpen,
                                                               userData,
                                                               isProfileComplete,
                                                           }) => {
    const [formData, setFormData] = useState({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        birthday: userData.birthDate || "",
        gender: userData.gender || "",
        location: userData.country || "",
    });

    const {updateDemographics} = useUpdateDemographics();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async () => {
        const {birthday, gender, location} = formData;

        if (!userData.userId) {
            alert("User ID not found.");
            return;
        }
        if (!birthday || !gender || !location) {
            alert("Please fill all required fields.");
            return;
        }
        try {
            await updateDemographics({
                userId: userData.userId,
                birthDate: birthday,
                gender,
                country: location,
            });

            setIsFormOpen(false);
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile. Please try again." + error);
        }
    };

    return (
        <Dialog open={isFormOpen && !isProfileComplete} maxWidth="sm" fullWidth>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogContent>
                <Typography variant="body2" style={{marginBottom: "20px"}}>
                    Please complete the form below to proceed. Your data will remain private and secure.
                </Typography>
                <TextField
                    type="text"
                    label="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    fullWidth
                    style={{marginBottom: "20px"}}
                />
                <TextField
                    type="text"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    fullWidth
                    style={{marginBottom: "20px"}}
                />
                <TextField
                    type="date"
                    label="Birthday"
                    name="birthday"
                    onChange={handleChange}
                    value={formData.birthday}
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    style={{marginBottom: "20px"}}
                />
                <FormControl fullWidth style={{marginBottom: "20px"}}>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={formData.gender} onChange={handleChange}>
                        <MenuItem value="MALE">MALE</MenuItem>
                        <MenuItem value="FEMALE">FEMALE</MenuItem>
                        <MenuItem value="OTHER">OTHER</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select name="location" value={formData.location} onChange={handleChange}>
                        {countries.map((country, index) => (
                            <MenuItem key={index} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleFormSubmit} fullWidth>
                    Submit and Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DemographicPopup;
