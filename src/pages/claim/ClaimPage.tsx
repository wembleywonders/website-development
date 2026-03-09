import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './ClaimPage.module.css'

// ─── API ──────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ClaimData {
  valid: boolean
  authorId?: number
  creatorName?: string
  contributionType?: string
  repertoireTitle?: string
  repertoireFormat?: string
  captureContext?: string
  expiresAt?: string
  message?: string
}

interface RedeemResult {
  success: boolean
  creatorName: string
  contributionType: string
  repertoireTitle: string
  repertoireEntryId: string
  claimedAt: string
  creatorId: number
  message: string
}

// ─── Contribution labels ──────────────────────────────────────────────────────
const ROLE_LABELS: Record<string, string> = {
  ORIGINATED:      'Origin Keeper',
  DEVELOPED:       'Developer',
  NAMED:           'Namer',
  PARTICIPATED:    'Participant',
  FACILITATED:     'Facilitator',
  PERFORMED:       'Performer',
  CONTEXTUALISED:  'Contextualiser',
  SOURCE_CREDITED: 'Source',
}

const CONTEXT_LABELS: Record<string, string> = {
  HALF_TERM:     'Half Term Session',
  COACH_TRIP:    'Coach Trip',
  LIVE_EVENT:    'Live Event',
  WORKSHOP:      'Workshop',
  WEEKENDER:     'Weekender',
  PRODUCTION:    'Production',
  RADIO_SESSION: 'Radio Session',
  SPONTANEOUS:   'Spontaneous',
  DIGITAL:       'Digital',
}

// ─── Component ────────────────────────────────────────────────────────────────
const ClaimPage: React.FC = () => {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  // ✨ FIX: use getToken() — AuthContext exposes no raw `token` property
  const { user, getToken } = useAuth()
  const authToken = getToken()

  const [phase, setPhase] = useState<
    'loading' | 'valid' | 'redeeming' | 'claimed' | 'already_claimed' | 'invalid' | 'error'
  >('loading')

  const [claimData,  setClaimData]  = useState<ClaimData | null>(null)
  const [redeemData, setRedeemData] = useState<RedeemResult | null>(null)
  const [errorMsg,   setErrorMsg]   = useState('')

  // ── 1. Validate token on mount ───────────────────────────────────────────
  useEffect(() => {
    if (!token) { setPhase('invalid'); return }

    const validate = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/claim/${token}`)
        const data: ClaimData = await res.json()

        if (res.status === 404 || !data.valid) {
          if (data.message?.toLowerCase().includes('already')) {
            setClaimData(data)
            setPhase('already_claimed')
          } else {
            setClaimData(data)
            setPhase('invalid')
          }
          return
        }

        setClaimData(data)
        setPhase('valid')
      } catch {
        setPhase('error')
        setErrorMsg('Could not reach the Wembley Wonders server. Please check your connection.')
      }
    }

    validate()
  }, [token])

  // ── 2. Redeem ────────────────────────────────────────────────────────────
  const handleClaim = async () => {
    if (!authToken) {
      navigate(`/auth/signup?intent=creator&redirect=/claim/${token}`)
      return
    }

    setPhase('redeeming')
    try {
      const res = await fetch(`${API_BASE}/api/claim/${token}/redeem`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const data: RedeemResult = await res.json()

      if (!res.ok || !data.success) {
        setPhase('error')
        setErrorMsg(data.message ?? 'Something went wrong. Please try again.')
        return
      }

      setRedeemData(data)
      setPhase('claimed')
    } catch {
      setPhase('error')
      setErrorMsg('Could not complete your claim. Please try again.')
    }
  }

  const roleLabel    = ROLE_LABELS[claimData?.contributionType ?? ''] ?? claimData?.contributionType ?? 'Contributor'
  const contextLabel = CONTEXT_LABELS[claimData?.captureContext ?? ''] ?? claimData?.captureContext ?? ''

  const expiryFormatted = claimData?.expiresAt
    ? new Date(claimData.expiresAt).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>

      <div className={styles.bgGlow} />
      <div className={styles.bgGrid} />

      <div className={styles.shell}>

        {/* Wordmark */}
        <div className={styles.wordmark}>
          <div className={styles.wwBadge}>WW</div>
          <div>
            <div className={styles.wwName}>Wembley Wonders</div>
            <div className={styles.wwSub}>Community Creator Programme</div>
          </div>
        </div>

        {/* ── LOADING ── */}
        {phase === 'loading' && (
          <div className={styles.centred}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Checking your credit…</p>
          </div>
        )}

        {/* ── VALID — unclaimed ── */}
        {phase === 'valid' && claimData && (
          <div className={styles.card} data-state="valid">
            <div className={styles.cardBar} />
            <div className={styles.cardInner}>
              <p className={styles.cardEyebrow}>Your Creative Credit</p>
              <h1 className={styles.cardTitle}>{claimData.repertoireTitle}</h1>

              <div className={styles.roleRow}>
                <span className={styles.rolePill}>{roleLabel}</span>
                {contextLabel && (
                  <span className={styles.contextPill}>{contextLabel}</span>
                )}
              </div>

              <div className={styles.creatorRow}>
                <span className={styles.diamond}>◈</span>
                <span className={styles.creatorName}>{claimData.creatorName}</span>
              </div>

              <p className={styles.cardBody}>
                This contribution has been recorded in the Wembley Wonders
                Counter-Archive. Claim it now to secure your credit and receive
                your share of any future revenue this work generates.
              </p>

              {expiryFormatted && (
                <p className={styles.expiry}>Valid until {expiryFormatted}</p>
              )}

              <button className={styles.btnClaim} onClick={handleClaim}>
                {user ? 'Claim My Credit' : 'Register to Claim'}
              </button>

              {!user && (
                <button
                  className={styles.btnSecondary}
                  onClick={() => navigate(`/auth/login?redirect=/claim/${token}`)}
                >
                  Already have an account? Log in →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── REDEEMING ── */}
        {phase === 'redeeming' && (
          <div className={styles.centred}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Locking in your credit…</p>
          </div>
        )}

        {/* ── CLAIMED — success ── */}
        {phase === 'claimed' && redeemData && (
          <div className={styles.card} data-state="claimed">
            <div className={styles.cardBar} style={{ background: 'linear-gradient(90deg, #1a9688, #e8b84b)' }} />
            <div className={styles.cardInner}>
              <div className={styles.successMark}>◈</div>
              <p className={styles.cardEyebrow}>Credit Secured</p>
              <h1 className={styles.cardTitle}>{redeemData.repertoireTitle}</h1>

              <div className={styles.roleRow}>
                <span className={styles.rolePill}>
                  {ROLE_LABELS[redeemData.contributionType] ?? redeemData.contributionType}
                </span>
              </div>

              <div className={styles.creatorRow}>
                <span className={styles.diamond}>◈</span>
                <span className={styles.creatorName}>{redeemData.creatorName}</span>
              </div>

              <p className={styles.cardBody}>
                Your contribution is now permanently recorded. You will receive
                your revenue share automatically on every future commercial
                performance of this work.
              </p>

              <p className={styles.claimedAt}>
                Claimed {new Date(redeemData.claimedAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>

              <button
                className={styles.btnClaim}
                onClick={() => navigate('/creators-journal')}
              >
                View My Creator Journal →
              </button>
            </div>
          </div>
        )}

        {/* ── ALREADY CLAIMED ── */}
        {phase === 'already_claimed' && (
          <div className={styles.card} data-state="already_claimed">
            <div className={styles.cardBar} style={{ background: 'linear-gradient(90deg, #1a9688, #4a9a60)' }} />
            <div className={styles.cardInner}>
              <div className={styles.successMark} style={{ color: '#1a9688' }}>◈</div>
              <p className={styles.cardEyebrow}>Already Recorded</p>
              <h1 className={styles.cardTitleSm}>This credit has been claimed.</h1>
              <p className={styles.cardBody}>
                This contribution is already secured in the Counter-Archive.
                If this is your credit, log in to view it in your Creator Journal.
              </p>
              <button
                className={styles.btnClaim}
                onClick={() => navigate(user ? '/creators-journal' : `/auth/login?redirect=/creators-journal`)}
              >
                {user ? 'Go to My Journal' : 'Log In to View Your Credits'}
              </button>
            </div>
          </div>
        )}

        {/* ── INVALID / EXPIRED ── */}
        {phase === 'invalid' && (
          <div className={styles.card} data-state="invalid">
            <div className={styles.cardBar} style={{ background: 'linear-gradient(90deg, #5a4030, #c4522a)' }} />
            <div className={styles.cardInner}>
              <p className={styles.cardEyebrow} style={{ color: '#c4522a' }}>Token Not Found</p>
              <h1 className={styles.cardTitleSm}>
                {claimData?.message ?? 'This claim link is not valid or has expired.'}
              </h1>
              <p className={styles.cardBody}>
                Claim tokens are valid for 90 days. If you think this is a mistake,
                speak to a Wembley Wonders facilitator at your next session.
              </p>
              <button
                className={styles.btnSecondary}
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {phase === 'error' && (
          <div className={styles.card} data-state="error">
            <div className={styles.cardBar} style={{ background: 'linear-gradient(90deg, #5a4030, #c4522a)' }} />
            <div className={styles.cardInner}>
              <p className={styles.cardEyebrow} style={{ color: '#c4522a' }}>Something went wrong</p>
              <h1 className={styles.cardTitleSm}>{errorMsg}</h1>
              <p className={styles.cardBody}>
                Your claim slip is still valid. Please try again in a moment.
              </p>
              <button
                className={styles.btnClaim}
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => navigate('/contact')}
              >
                Get Help
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <span>Counter-Archive</span>
          <span className={styles.footerDots}>◆ ◆ ◆</span>
          <span>Wembley Wonders CIC</span>
        </div>

      </div>
    </div>
  )
}

export default ClaimPage