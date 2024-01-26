<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<table border="1">
    <tr bgcolor="#9acd32">
      <th>Title</th>
      <th>Artist</th>

</tr>


<xsl:for-each select="root/item">
<xsl:sort select="title"/>

    <tr>
      <td><xsl:value-of select="title"/></td>
      <td><xsl:value-of select="link"/></td>
    </tr>


<item>
<title>
<xsl:value-of select="title"/>
 
</title>
<description>
<xsl:value-of select="description"/>
 </description>
<plink>
<p>
<xsl:value-of select="link"/>
</p>
 </plink>

</item>
 </xsl:for-each>

  
 </table>

</xsl:template>

</xsl:stylesheet>