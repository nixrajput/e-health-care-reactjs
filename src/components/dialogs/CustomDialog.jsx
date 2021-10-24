import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSpinner from '../widgets/LoadingSpinner';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, fullScreen, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: "var(--activeColor)"
                    }}
                >
                    <CloseIcon style={{
                        width: 32,
                        height: 32
                    }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function CustomDialog({
    show,
    handleClose,
    title,
    body,
    actions,
    isLoading,
    fullScreen = false
}) {
    return (
        <div>
            <BootstrapDialog
                onClose={
                    () => handleClose
                }
                aria-labelledby="customized-dialog-title"
                open={show}
                keepMounted
                fullWidth
                fullScreen={fullScreen}>

                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    fullScreen={fullScreen}
                    onClose={handleClose}
                    style={{
                        textTransform: "capitalize",
                        fontWeight: 500,
                        color: "var(--secondColor)"
                    }}>
                    {title}
                </BootstrapDialogTitle>

                <DialogContent
                    className="custom-modal">
                    {body}
                </DialogContent>

                {
                    actions !== null &&
                    <DialogActions>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%"
                        }}>

                            <div style={{
                                margin: "1rem"
                            }}>
                                {
                                    isLoading ?
                                        <LoadingSpinner />
                                        :
                                        null
                                }
                            </div>

                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>

                                {actions}

                            </div>
                        </div>
                    </DialogActions>
                }

            </BootstrapDialog>
        </div>
    );
}

export default CustomDialog;
