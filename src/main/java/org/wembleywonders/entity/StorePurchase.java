package org.wembleywonders.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "store_purchases")
public class StorePurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "listing_id", nullable = false)
    private UUID listingId;

    @Column(name = "buyer_user_id")
    private UUID buyerUserId;

    @Column(name = "buyer_email")
    private String buyerEmail;

    @Column(name = "amount_gbp", nullable = false, precision = 8, scale = 2)
    private BigDecimal amountGbp;

    @Column(name = "creator_amount_gbp", nullable = false, precision = 8, scale = 2)
    private BigDecimal creatorAmountGbp;

    @Column(name = "reserve_amount_gbp", nullable = false, precision = 8, scale = 2)
    private BigDecimal reserveAmountGbp;

    @Column(name = "ops_amount_gbp", nullable = false, precision = 8, scale = 2)
    private BigDecimal opsAmountGbp;

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;

    @Column(name = "stripe_transfer_id")
    private String stripeTransferId;

    @Column(name = "download_url", columnDefinition = "TEXT")
    private String downloadUrl;

    @Column(name = "download_expires_at")
    private LocalDateTime downloadExpiresAt;

    @Column(name = "download_count", nullable = false)
    private int downloadCount = 0;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
