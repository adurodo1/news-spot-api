<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:variable name="title" select="'parent/@title'" />

  <xsl:template match="/">
    <div class="group">
      <h3>
        <xsl:value-of select="parent/@title" />
      </h3>
      <span>View news only from <a href="/{parent/@title}">
          <xsl:value-of select="parent/@title" />
        </a>
      </span>
      <div class="items_box">
        <xsl:for-each select="parent/item">
          <xsl:sort select="title" />
        <div class="item">
            <div class="title">
              <xsl:value-of select="title" />
            </div>
            <div class="pubdate">
              <xsl:value-of select="pubDate" />
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
    </div>


  </xsl:template>

</xsl:stylesheet>