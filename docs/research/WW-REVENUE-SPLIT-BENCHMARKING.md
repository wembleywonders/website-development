# WW Revenue Split Benchmarking

Running document — one entry per revenue model as it gets benchmarked against external
comparators. **No file under this name, or any "WW-REVENUE-MODELS" name, existed
anywhere in the repo before this entry** (checked directly, full repo search); this is
created fresh, starting with the STANDARD split below.

**Provenance note on this entry:** the STANDARD benchmark below states it was done "the
same way the ATELIER_COMMISSION 75/20/5 split was benchmarked earlier." A full repo
search found **no prior ATELIER_COMMISSION benchmarking document or artifact anywhere**
— if that earlier benchmark happened, it exists only in chat memory, not in this
repository, the same situation as several other pieces of research exported into docs
this session. Flagging this rather than implying the earlier benchmark is available here
to check against — it isn't, yet.

---

## Revenue Split Benchmarking — STANDARD 55/25/20 (22 Aug 2026)

The canonical STANDARD revenue model
(`src/blockchain/config/revenueModels.ts:47-51` — confirmed by direct read: `maker: 55,
platform: 25, community: 20`) allocates 55% creator, 25% community, 20% Wembley Wonders
CIC operations.

### Comparators found

**Stocksy** (artist-owned platform co-op for photographers) — pays photographers 50% of
a standard license sale, 75% on extended licenses, plus a co-op ownership dividend to
every member on top of that, since photographers are co-owners. Same underlying pattern
as WW's split — a direct creator share plus a collective-upside layer — though Stocksy's
collective layer is ownership-dividend-based rather than a fixed percentage.

**YouTube** — runs a 55/45 creator/platform split. An exact match to WW's 55% creator
share. YouTube's 45% is pure platform margin with no redistribution back to viewers or
community, unlike WW's 25/20 split of the remainder between community and operations.

### Conclusion

WW's 55% creator share sits at the top of what comparable platforms pay externally
verified against a real, large platform (YouTube), and the 25/20 division of the
remainder maps onto a real working cooperative pattern (Stocksy) rather than an invented
one. The split is not undercutting creators to fund community/operations — it pays
competitively on the creator side while also funding the collective side, which is
harder to achieve than either alone.

### Known gap, not yet filled

No UK-specific creator-cooperative comparator with a named percentage split was found in
this research pass. Worth a further, narrower search before this analysis is used in
anything formal (a board paper, a funder conversation) — Stocksy and YouTube are both
real and useful comparators, but neither operates as a UK cooperative under the same
regulatory constraints WW does.

---

## Separate, related regulatory fact — not part of the creator-split comparison, but relevant to WW's own financial structure

**Correction — checked against current UK legislation before this went into the file,
23 Aug 2026 (Claude Code), rather than transcribed as given.** The original note stated:
*"UK CIC regulation caps aggregate shareholder dividends at 35% of distributable profits
in any financial year, with per-share returns additionally capped at 5% above Bank of
England base rate."* Checked via direct web search against the actual regulations —
**the first half is current; the second half is not:**

- **The 35% aggregate dividend cap is real and still in force.** A CIC cannot
  distribute more than 35% of its distributable profits as dividends in a given
  financial year; unused capacity can be carried forward for up to five years. This is
  a hard regulatory ceiling on how much surplus the CIC itself could ever distribute
  versus retain under the statutory asset lock, separate from the creator/community/
  operations revenue split. Confirmed against the original *Community Interest Company
  Regulations 2005* (regulation 22) and current third-party summaries of the CIC regime.
- **The per-share dividend cap (previously capped by reference to a share's paid-up
  value) no longer exists — it was removed by *The Community Interest Company
  (Amendment) Regulations 2014* (SI 2014/2483), in force from 1 October 2014,
  applying to dividends declared or proposed on or after that date.** The "5% above
  Bank of England base rate" figure in the original note does not match current
  regulation as a per-share dividend rule; it appears to conflate the (now-abolished)
  per-share dividend cap with the separate, still-current **interest cap** on CIC loan
  capital (a cap on the interest rate a CIC can pay on debt, not on dividends per
  share) — sources found on the interest cap's exact current rate were not fully
  consistent (one describing it as a fixed few points above Bank of England base rate,
  another describing a 20% cap specific to performance-linked loan notes), so that
  figure is flagged as needing its own dedicated check before being cited anywhere,
  rather than stated as settled here.

**Net correction: the only dividend-relevant cap currently in force is the 35%
aggregate cap. There is no current per-share cap, and no current "5% above base rate"
dividend rule of any kind.** If this fact is going into a board paper or funder
conversation, cite the 35% aggregate cap only, and treat the interest-cap figure as
unverified until checked separately — do not carry the original "5% above base rate"
figure forward as if it still applies to dividends.

Sources checked (via web search, 23 Aug 2026):
- [The Community Interest Company Regulations 2005, regulation 22](https://www.legislation.gov.uk/uksi/2005/1788/regulation/22/made)
- [The Community Interest Company (Amendment) Regulations 2014](https://www.legislation.gov.uk/uksi/2014/2483/note/made)
- [Removal of asset lock on dividends from CICs 'will encourage social investment', say lawyers — Third Sector](https://www.thirdsector.co.uk/removal-asset-lock-dividends-cics-will-encourage-social-investment-say-lawyers/social-enterprise/article/1308481)
