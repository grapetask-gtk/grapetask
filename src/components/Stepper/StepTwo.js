import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Chip,
  Autocomplete,
  Checkbox,
  Divider,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { 
  BsPatchCheckFill, 
  BsChevronDown,
  BsPlus,
  BsX 
} from "react-icons/bs";

const StepTwo = ({
  // Basic package fields
  basicPackage,
  setBasicPackage,
  standerdPackage,
  setStanderdPackage,
  premiumPackage,
  setPremiumPackage,
  sourceFileBasice,
  setSourceFileBasice,
  sourceFileStandard,
  setSourceFileStandard,
  sourceFilePremium,
  setSourceFilePremium,
  resolutionFileBasice,
  setResolutionFileBasice,
  resolutionFileStandard,
  setResolutionFileStandard,
  resolutionFilePremium,
  setResolutionFilePremium,
  totalBasic,
  setTotalBasic,
  totalStand,
  setTotalStand,
  totalPremium,
  setTotalPremium,
  ravisionBasic,
  setRavisionBasic,
  ravisionStadard,
  setRavisionStadard,
  ravisionPremium,
  setRavisionPremium,
  deliveryBasic,
  setDeliveryBasic,
  deliveryStadard,
  setDeliveryStadard,
  deliveryPremium,
  setDeliveryPremium,
  
  // Additional package details
  experienceLevel,
  setExperienceLevel,
  languages,
  setLanguages,
  skills,
  setSkills,
  availability,
  setAvailability,
  responseTime,
  setResponseTime,
  supportedFormats,
  setSupportedFormats,
  usageRights,
  setUsageRights,
  revisionsIncluded,
  setRevisionsIncluded,
  supportIncluded,
  setSupportIncluded,
  
  // Error handling
  isErrorShowPricing,
  isErrorPricing,
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState('pricing');
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: 'Fluent' });
  const [newSkill, setNewSkill] = useState('');

  // Language options
  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 
    'Japanese', 'Arabic', 'Portuguese', 'Russian', 'Hindi'
  ];

  // Proficiency levels
  const proficiencyLevels = ['Basic', 'Conversational', 'Fluent', 'Native'];

  // Skill suggestions
  const skillSuggestions = [
    'UI/UX Design', 'Logo Design', 'Web Development', 'Content Writing',
    'SEO', 'Social Media Marketing', 'Video Editing', 'Photo Editing',
    'Illustration', 'Animation', 'WordPress', 'Shopify', 'Data Analysis'
  ];

  // Supported file formats
  const formatOptions = [
    'PSD', 'AI', 'PDF', 'JPG', 'PNG', 'SVG', 'EPS', 'FIG', 'SKETCH',
    'MP4', 'MOV', 'AVI', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX'
  ];

  // Package input handler
  const handlePackageChange = (setter, value) => {
    if (value.length <= 200) {
      setter(value);
    }
  };

  // Revision input handler (numbers only)
  const handleRevisionChange = (setter, value) => {
    setter(value.replace(/[^0-9]/g, ""));
  };

  // Price input handler
  const handlePriceChange = (setter, value) => {
    value = value.replace("$", "");
    value = value.replace(/[^0-9]/g, "");
    setter("$" + value);
  };

  // Add a new language
  const handleAddLanguage = () => {
    if (newLanguage.language && newLanguage.proficiency) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage({ language: '', proficiency: 'Fluent' });
    }
  };

  // Remove a language
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Toggle supported format
  const handleFormatToggle = (format) => {
    if (supportedFormats.includes(format)) {
      setSupportedFormats(supportedFormats.filter(f => f !== format));
    } else {
      setSupportedFormats([...supportedFormats, format]);
    }
  };

  // Handle accordion change
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  // Table rows data
  const rows = [
    {
      name: "Package",
      basic: (
        <div className="poppins">
          <h4 className="font-20 blackcolor bg-white px-2 p-3 text-center rounded-1">
            Basic
          </h4>
          <div className={`${!basicPackage ? "d-flex align-items-center" : ""}`}>
            <input
              value={basicPackage}
              onChange={(e) => handlePackageChange(setBasicPackage, e.target.value)}
              placeholder="Create a Basic Package"
              className="font-12 border-0 w-100 takegraycolor text-start packeges-input"
            />
          </div>
          <p className="font-12 takegraycolor text-end packeges-input mt-3">
            max {basicPackage.length}/200
          </p>
        </div>
      ),
      standard: (
        <div className="poppins">
          <h4 className="font-20 blackcolor bg-white px-2 p-3 text-center rounded-1">
            Standard
          </h4>
          <div className={`${!standerdPackage ? "d-flex align-items-center" : ""}`}>
            <input
              value={standerdPackage}
              onChange={(e) => handlePackageChange(setStanderdPackage, e.target.value)}
              placeholder="Create a Standard Package"
              className="font-12 border-0 w-100 takegraycolor text-start packeges-input"
            />
          </div>
          <p className="font-12 takegraycolor text-end packeges-input mt-3">
            max {standerdPackage.length}/200
          </p>
        </div>
      ),
      premium: (
        <div className="poppins">
          <h4 className="font-20 blackcolor bg-white px-2 p-3 text-center rounded-1">
            Premium
          </h4>
          <div className={`${!premiumPackage ? "d-flex align-items-center" : ""}`}>
            <input
              value={premiumPackage}
              onChange={(e) => handlePackageChange(setPremiumPackage, e.target.value)}
              placeholder="Create a Premium Package"
              className="font-12 border-0 w-100 takegraycolor text-start packeges-input"
            />
          </div>
          <p className="font-12 takegraycolor text-end packeges-input mt-3">
            max {premiumPackage.length}/200
          </p>
        </div>
      ),
    },
    {
      name: "Source File",
      basic: (
        <CustomCheckbox
          checked={sourceFileBasice === "yes"}
          onChange={(e) => setSourceFileBasice(e.target.checked ? "yes" : "no")}
          id="sourceBasic"
        />
      ),
      standard: (
        <CustomCheckbox
          checked={sourceFileStandard === "yes"}
          onChange={(e) => setSourceFileStandard(e.target.checked ? "yes" : "no")}
          id="sourceStandard"
        />
      ),
      premium: (
        <CustomCheckbox
          checked={sourceFilePremium === "yes"}
          onChange={(e) => setSourceFilePremium(e.target.checked ? "yes" : "no")}
          id="sourcePremium"
        />
      ),
    },
    {
      name: "High Resolution",
      basic: (
        <CustomCheckbox
          checked={resolutionFileBasice === "yes"}
          onChange={(e) => setResolutionFileBasice(e.target.checked ? "yes" : "no")}
          id="resolutionBasic"
        />
      ),
      standard: (
        <CustomCheckbox
          checked={resolutionFileStandard === "yes"}
          onChange={(e) => setResolutionFileStandard(e.target.checked ? "yes" : "no")}
          id="resolutionStandard"
        />
      ),
      premium: (
        <CustomCheckbox
          checked={resolutionFilePremium === "yes"}
          onChange={(e) => setResolutionFilePremium(e.target.checked ? "yes" : "no")}
          id="resolutionPremium"
        />
      ),
    },
    {
      name: "Revision",
      basic: (
        <input
          value={ravisionBasic}
          onChange={(e) => handleRevisionChange(setRavisionBasic, e.target.value)}
          placeholder="0"
          className="font-20 fw-medium border-0 w-100 inter revision-field text-center packeges-input"
          type="number"
          min="0"
        />
      ),
      standard: (
        <input
          value={ravisionStadard}
          onChange={(e) => handleRevisionChange(setRavisionStadard, e.target.value)}
          placeholder="0"
          className="font-20 fw-medium border-0 w-100 inter revision-field text-center packeges-input"
          type="number"
          min="0"
        />
      ),
      premium: (
        <input
          value={ravisionPremium}
          onChange={(e) => handleRevisionChange(setRavisionPremium, e.target.value)}
          placeholder="0"
          className="font-20 fw-medium border-0 w-100 inter revision-field text-center packeges-input"
          type="number"
          min="0"
        />
      ),
    },
    {
      name: "Delivery Time",
      basic: (
        <DeliveryTimeSelect
          value={deliveryBasic}
          onChange={setDeliveryBasic}
        />
      ),
      standard: (
        <DeliveryTimeSelect
          value={deliveryStadard}
          onChange={setDeliveryStadard}
        />
      ),
      premium: (
        <DeliveryTimeSelect
          value={deliveryPremium}
          onChange={setDeliveryPremium}
        />
      ),
    },
    {
      name: "Total",
      basic: (
        <input
          value={totalBasic}
          onChange={(e) => handlePriceChange(setTotalBasic, e.target.value)}
          className="font-20 fw-medium border-0 w-100 inter blackcolor text-center packeges-input"
        />
      ),
      standard: (
        <input
          value={totalStand}
          onChange={(e) => handlePriceChange(setTotalStand, e.target.value)}
          className="font-20 fw-medium border-0 w-100 inter blackcolor text-center packeges-input"
        />
      ),
      premium: (
        <input
          value={totalPremium}
          onChange={(e) => handlePriceChange(setTotalPremium, e.target.value)}
          className="font-20 fw-medium border-0 w-100 inter blackcolor text-center packeges-input"
        />
      ),
    },
  ];

  return (
    <>
      <div className="stepTwo">
        {/* Pricing Table Accordion */}
        <Accordion 
          expanded={expandedAccordion === 'pricing'} 
          onChange={handleAccordionChange('pricing')}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<BsChevronDown />}>
            <Typography variant="h6">Package Pricing & Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer className="step-two-table" component={Paper}>
              <Table aria-label="pricing table">
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        className="font-20 blackcolor"
                        sx={{ width: "300px" }}
                      >
                        <h4 className="font-20 inter blackcolor">{row.name}</h4>
                      </TableCell>
                      <TableCell sx={{ width: "300px" }} align="center">
                        {row.basic}
                      </TableCell>
                      <TableCell sx={{ width: "300px" }} align="center">
                        {row.standard}
                      </TableCell>
                      <TableCell sx={{ width: "300px" }} align="center">
                        {row.premium}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* Additional Details Accordion */}
        <Accordion 
          expanded={expandedAccordion === 'details'} 
          onChange={handleAccordionChange('details')}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<BsChevronDown />}>
            <Typography variant="h6">Additional Service Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mt: 2 }}>
              {/* Experience Level */}
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Experience Level</FormLabel>
                <RadioGroup
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  row
                >
                  <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                  <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                  <FormControlLabel value="expert" control={<Radio />} label="Expert" />
                </RadioGroup>
              </FormControl>

              <Divider sx={{ my: 2 }} />

              {/* Languages */}
              <Typography variant="h6" gutterBottom>Languages</Typography>
              {languages.map((lang, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip 
                    label={`${lang.language} (${lang.proficiency})`} 
                    onDelete={() => handleRemoveLanguage(index)}
                    sx={{ mr: 1 }}
                  />
                </Box>
              ))}
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                <Autocomplete
                  freeSolo
                  options={languageOptions}
                  value={newLanguage.language}
                  onChange={(_, value) => setNewLanguage({...newLanguage, language: value || ''})}
                  onInputChange={(_, value) => setNewLanguage({...newLanguage, language: value})}
                  renderInput={(params) => (
                    <TextField {...params} label="Language" size="small" sx={{ width: 200 }} />
                  )}
                />
                <TextField
                  select
                  label="Proficiency"
                  value={newLanguage.proficiency}
                  onChange={(e) => setNewLanguage({...newLanguage, proficiency: e.target.value})}
                  size="small"
                  sx={{ width: 150 }}
                  SelectProps={{ native: true }}
                >
                  {proficiencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </TextField>
                <Button 
                  variant="outlined" 
                  startIcon={<BsPlus />} 
                  onClick={handleAddLanguage}
                  disabled={!newLanguage.language}
                >
                  Add
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Skills */}
              <Typography variant="h6" gutterBottom>Skills</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Autocomplete
                  freeSolo
                  options={skillSuggestions}
                  value={newSkill}
                  onChange={(_, value) => setNewSkill(value || '')}
                  onInputChange={(_, value) => setNewSkill(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Add a skill" size="small" sx={{ width: 250 }} />
                  )}
                />
                <Button 
                  variant="outlined" 
                  startIcon={<BsPlus />} 
                  onClick={handleAddSkill}
                  disabled={!newSkill}
                >
                  Add
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Availability & Response Time */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <FormLabel>Availability</FormLabel>
                  <TextField
                    select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    <option value="immediately">Immediately</option>
                    <option value="within_24_hours">Within 24 hours</option>
                    <option value="within_3_days">Within 3 days</option>
                    <option value="within_week">Within a week</option>
                  </TextField>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <FormLabel>Response Time</FormLabel>
                  <TextField
                    select
                    value={responseTime}
                    onChange={(e) => setResponseTime(e.target.value)}
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    <option value="within_1_hour">Within 1 hour</option>
                    <option value="within_3_hours">Within 3 hours</option>
                    <option value="within_6_hours">Within 6 hours</option>
                    <option value="within_12_hours">Within 12 hours</option>
                    <option value="within_24_hours">Within 24 hours</option>
                  </TextField>
                </FormControl>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Supported Formats */}
              <Typography variant="h6" gutterBottom>Supported File Formats</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Select the file formats you can deliver to clients
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formatOptions.map(format => (
                  <Chip
                    key={format}
                    label={format}
                    clickable
                    color={supportedFormats.includes(format) ? 'primary' : 'default'}
                    onClick={() => handleFormatToggle(format)}
                    variant={supportedFormats.includes(format) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Usage Rights & Additional Services */}
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Usage Rights</FormLabel>
                <RadioGroup
                  value={usageRights}
                  onChange={(e) => setUsageRights(e.target.value)}
                >
                  <FormControlLabel 
                    value="personal_use" 
                    control={<Radio />} 
                    label="Personal Use Only" 
                  />
                  <FormControlLabel 
                    value="commercial_use" 
                    control={<Radio />} 
                    label="Commercial Use" 
                  />
                  <FormControlLabel 
                    value="buyout_license" 
                    control={<Radio />} 
                    label="Buyout License (Full rights)" 
                  />
                </RadioGroup>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={revisionsIncluded} 
                    onChange={(e) => setRevisionsIncluded(e.target.checked)} 
                  />
                }
                label="Revisions included in base price"
              />

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={supportIncluded} 
                    onChange={(e) => setSupportIncluded(e.target.checked)} 
                  />
                }
                label="Post-delivery support included"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        
        {isErrorPricing && (
          <div
            className="alert alert-danger mt-3 poppins text-center"
            role="alert"
          >
            {isErrorShowPricing}
          </div>
        )}
      </div>
    </>
  );
};

// Custom checkbox component
const CustomCheckbox = ({ checked, onChange, id }) => (
  <div className="form-check ps-0 d-flex justify-content-center">
    <input
      className="form-check-input d-none"
      checked={checked}
      onChange={onChange}
      type="checkbox"
      id={id}
    />
    <label className="form-check-label cursor-pointer" htmlFor={id}>
      <BsPatchCheckFill color={checked ? "#F16336" : "#667085"} size={20} />
    </label>
  </div>
);

// Delivery time select component
const DeliveryTimeSelect = ({ value, onChange }) => {
  const deliveryOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  
  return (
    <div className="d-flex justify-content-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
        aria-label="Delivery time"
      >
        <option value="">Select days</option>
        {deliveryOptions.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StepTwo;