import * as anchor from '@project-serum/anchor'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { MintCountdown } from './MintCountdown'
import { toDate, formatNumber } from './utils'
import { CandyMachineAccount } from './candy-machine'

type HeaderProps = {
  candyMachine?: CandyMachineAccount
}

export const MintInfo = ({ candyMachine }: HeaderProps) => {
  return (
    <>
      {candyMachine && (
        <Grid container direction="row" wrap="nowrap">
          <Grid item sm>
            <Typography variant="body2" color="textSecondary">
              Remaining
            </Typography>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{
                fontWeight: 'bold'
              }}
            >
              {`${candyMachine?.state.itemsRemaining}`}
            </Typography>
          </Grid>
          <Grid item sm>
            <Typography variant="body2" color="textSecondary">
              Price
            </Typography>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ fontWeight: 'bold' }}
            >
              {getMintPrice(candyMachine)}
            </Typography>
          </Grid>
          <MintCountdown
            date={toDate(
              candyMachine?.state.goLiveDate
                ? candyMachine?.state.goLiveDate
                : candyMachine?.state.isPresale
                ? new anchor.BN(new Date().getTime() / 1000)
                : undefined
            )}
            style={{ justifyContent: 'flex-end' }}
            status={
              !candyMachine?.state?.isActive || candyMachine?.state?.isSoldOut
                ? 'COMPLETED'
                : candyMachine?.state.isPresale
                ? 'PRESALE'
                : 'LIVE'
            }
          />
        </Grid>
      )}
    </>
  )
}

const getMintPrice = (candyMachine: CandyMachineAccount): string => {
  const price = formatNumber.asNumber(
    candyMachine.state.isPresale
      ? candyMachine.state.whitelistMintSettings?.discountPrice!
      : candyMachine.state.price!
  )
  return `◎ ${price}`
}
