import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmedPaid] = useState(false);
    const moveBack = useMoveBack();

    const { checkin, isCheckingIn } = useCheckin();

    const { bookingId } = useParams();
    const { booking, isLoading } = useBooking(bookingId);

    useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);

    if (isLoading) return <Spinner />;

    const { guests, totalPrice } = booking;

    function handleCheckin() {
        if (!confirmPaid) return;
        checkin(bookingId);
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmedPaid(() => !confirmPaid)}
                    disabled={confirmPaid || isCheckingIn}
                    id="confirm"
                >
                    I confirm that the {guests.fullName} has paid the total
                    amount of {formatCurrency(totalPrice)}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
