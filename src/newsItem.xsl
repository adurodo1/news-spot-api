<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <div class="single_news_container">
            <xsl:for-each select="root/item">
                <xsl:sort select="title" />
               <div class="item">
                    <div class="title">
                        <xsl:value-of select="title" />
                    </div>
                    <div class="description">
                        <xsl:value-of select="description" />
                    </div>
                    <div class="link">
                        <div>
                            <a href="{link}" target="blank">
                                read from source
                            </a>
                        </div>
                    </div>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>
</xsl:stylesheet>